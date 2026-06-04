-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;

-- Products: All authenticated users can SELECT, only managers can modify
CREATE POLICY "Products are viewable by authenticated users"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Products can be created by managers"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

CREATE POLICY "Products can be updated by managers"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

CREATE POLICY "Products can be deleted by managers"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

-- Inventory batches: All authenticated users can SELECT, only managers can INSERT/UPDATE
CREATE POLICY "Inventory batches are viewable by authenticated users"
  ON inventory_batches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Inventory batches can be created by managers"
  ON inventory_batches FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

CREATE POLICY "Inventory batches can be updated by managers"
  ON inventory_batches FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

-- Users: Users can read their own record, managers can read all
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Managers can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

CREATE POLICY "Users can be created by managers"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

CREATE POLICY "Users can be updated by managers"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

-- Sales: Cashiers can read their own sales, managers can read all
-- All authenticated users can INSERT (sales creation)
CREATE POLICY "Cashiers can view their own sales"
  ON sales FOR SELECT
  TO authenticated
  USING (auth.uid() = cashier_id);

CREATE POLICY "Managers can view all sales"
  ON sales FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

CREATE POLICY "Authenticated users can create sales"
  ON sales FOR INSERT
  TO authenticated
  WITH CHECK (
    cashier_id = auth.uid() OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'manager'
      AND users.is_active = true
    )
  );

-- Sale items: Inherit access from parent sale via JOIN
CREATE POLICY "Users can view sale items for their accessible sales"
  ON sale_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sales
      WHERE sales.id = sale_items.sale_id
      AND (sales.cashier_id = auth.uid() OR EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = 'manager'
        AND users.is_active = true
      ))
    )
  );

CREATE POLICY "Authenticated users can create sale items"
  ON sale_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sales
      WHERE sales.id = sale_items.sale_id
      AND (sales.cashier_id = auth.uid() OR EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = 'manager'
        AND users.is_active = true
      ))
    )
  );
