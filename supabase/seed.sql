-- This seed data is for development/testing only
-- Create test users (passwords: "password123")
-- Note: You'll need to create these users through Supabase Dashboard first,
-- then insert the corresponding records in the users table

-- Sample products
INSERT INTO products (name, sku, size_inches, unit_price_retail, unit_price_wholesale, reorder_threshold, reorder_quantity) VALUES
('4-inch Hollow Block', 'HB-4', 4, 12.00, 10.00, 100, 500),
('6-inch Hollow Block', 'HB-6', 6, 18.00, 15.00, 100, 500),
('8-inch Hollow Block', 'HB-8', 8, 25.00, 22.00, 50, 300),
('10-inch Hollow Block', 'HB-10', 10, 32.00, 28.00, 50, 300);

-- Sample inventory batches for each product
-- Get product IDs first
DO $$
DECLARE
  product_4_id UUID;
  product_6_id UUID;
  product_8_id UUID;
  product_10_id UUID;
BEGIN
  SELECT id INTO product_4_id FROM products WHERE sku = 'HB-4';
  SELECT id INTO product_6_id FROM products WHERE sku = 'HB-6';
  SELECT id INTO product_8_id FROM products WHERE sku = 'HB-8';
  SELECT id INTO product_10_id FROM products WHERE sku = 'HB-10';

  -- Inventory batches for HB-4
  INSERT INTO inventory_batches (product_id, batch_number, quantity_received, quantity_current, received_date, cost_per_unit, notes) VALUES
  (product_4_id, 'BATCH-2026-001', 1000, 1250, '2026-05-15', 8.50, 'Initial stock from Supplier A'),
  (product_4_id, 'BATCH-2026-015', 500, 500, '2026-06-01', 8.75, 'Restock from Supplier A');

  -- Inventory batches for HB-6
  INSERT INTO inventory_batches (product_id, batch_number, quantity_received, quantity_current, received_date, cost_per_unit, notes) VALUES
  (product_6_id, 'BATCH-2026-002', 800, 890, '2026-05-15', 12.00, 'Initial stock from Supplier B'),
  (product_6_id, 'BATCH-2026-016', 400, 400, '2026-06-02', 12.25, 'Restock from Supplier B');

  -- Inventory batches for HB-8 (low stock scenario)
  INSERT INTO inventory_batches (product_id, batch_number, quantity_received, quantity_current, received_date, cost_per_unit, notes) VALUES
  (product_8_id, 'BATCH-2026-003', 300, 45, '2026-05-10', 18.00, 'Initial stock from Supplier C');

  -- Inventory batches for HB-10
  INSERT INTO inventory_batches (product_id, batch_number, quantity_received, quantity_current, received_date, cost_per_unit, notes) VALUES
  (product_10_id, 'BATCH-2026-004', 400, 320, '2026-05-20', 22.00, 'Initial stock from Supplier A');
END $$;
