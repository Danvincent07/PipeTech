-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  size_inches INTEGER NOT NULL,
  unit_price_retail DECIMAL(10, 2) NOT NULL CHECK (unit_price_retail > 0),
  unit_price_wholesale DECIMAL(10, 2) NOT NULL CHECK (unit_price_wholesale > 0),
  reorder_threshold INTEGER DEFAULT 100,
  reorder_quantity INTEGER DEFAULT 500,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index on SKU for fast lookups
CREATE INDEX idx_products_sku ON products(sku);

-- Inventory batches table (simplified for MVP - no supplier tracking yet)
CREATE TABLE inventory_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_number TEXT NOT NULL,
  quantity_received INTEGER NOT NULL CHECK (quantity_received >= 0),
  quantity_current INTEGER NOT NULL CHECK (quantity_current >= 0),
  received_date DATE NOT NULL DEFAULT CURRENT_DATE,
  cost_per_unit DECIMAL(10, 2) NOT NULL CHECK (cost_per_unit > 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (quantity_current <= quantity_received)
);

-- Index for FIFO queries (oldest batches first with stock)
CREATE INDEX idx_inventory_fifo ON inventory_batches(product_id, received_date, quantity_current);

-- Users table (extends Supabase auth.users)
CREATE TYPE user_role AS ENUM ('cashier', 'manager');

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'cashier',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sales table (MVP: cash and card only, no credit/delivery)
CREATE TYPE payment_method AS ENUM ('cash', 'card');
CREATE TYPE payment_status AS ENUM ('paid');

CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_number TEXT UNIQUE NOT NULL,
  cashier_id UUID NOT NULL REFERENCES users(id),
  sale_date TIMESTAMPTZ DEFAULT NOW(),
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax_total DECIMAL(10, 2) NOT NULL CHECK (tax_total >= 0),
  grand_total DECIMAL(10, 2) NOT NULL CHECK (grand_total >= 0),
  payment_method payment_method NOT NULL,
  payment_status payment_status DEFAULT 'paid',
  amount_paid DECIMAL(10, 2) NOT NULL CHECK (amount_paid >= 0),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sale items table
CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  batch_id UUID NOT NULL REFERENCES inventory_batches(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  line_total DECIMAL(10, 2) NOT NULL CHECK (line_total >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for sale queries
CREATE INDEX idx_sales_date ON sales(sale_date DESC);
CREATE INDEX idx_sales_cashier ON sales(cashier_id);
CREATE INDEX idx_sale_items_sale ON sale_items(sale_id);

-- Function to generate sale number: SALE-YYYYMMDD-#### (race-condition free)
CREATE OR REPLACE FUNCTION generate_sale_number()
RETURNS TEXT AS $$
DECLARE
  today_date TEXT;
  sequence_num INTEGER;
  sale_num TEXT;
  seq_name TEXT;
BEGIN
  today_date := TO_CHAR(NOW(), 'YYYYMMDD');
  seq_name := 'sale_seq_' || today_date;

  -- Create sequence for today if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = seq_name AND relkind = 'S') THEN
    EXECUTE format('CREATE SEQUENCE %I', seq_name);
  END IF;

  -- Get next sequence number atomically
  EXECUTE format('SELECT nextval(%L)', seq_name) INTO sequence_num;

  sale_num := 'SALE-' || today_date || '-' || LPAD(sequence_num::TEXT, 4, '0');

  RETURN sale_num;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to products and users tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
