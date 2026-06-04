# User Setup Instructions

Since user creation requires authentication, follow these steps:

## 1. Create Test Users via Supabase Dashboard

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" > "Create new user"
3. Create two test users:

**Cashier User:**
- Email: `cashier@hollowblocks.test`
- Password: `password123`
- Auto-confirm user: Yes

**Manager User:**
- Email: `manager@hollowblocks.test`
- Password: `password123`
- Auto-confirm user: Yes

## 2. Link Users to Roles

After creating auth users, run this SQL in Supabase SQL Editor:

```sql
-- Insert users into users table (replace UUIDs with actual IDs from auth.users)
INSERT INTO users (id, email, full_name, role, is_active) VALUES
(
  (SELECT id FROM auth.users WHERE email = 'cashier@hollowblocks.test'),
  'cashier@hollowblocks.test',
  'Test Cashier',
  'cashier',
  true
),
(
  (SELECT id FROM auth.users WHERE email = 'manager@hollowblocks.test'),
  'manager@hollowblocks.test',
  'Test Manager',
  'manager',
  true
);
```

## 3. Run Seed Data

In Supabase SQL Editor, copy and run the content of `supabase/seed.sql`.

This will create:
- 4 products (HB-4, HB-6, HB-8, HB-10)
- Inventory batches with stock levels
- HB-8 set to low stock (45 units) to test alerts

## Login Credentials

**Cashier:**
- Email: cashier@hollowblocks.test
- Password: password123

**Manager:**
- Email: manager@hollowblocks.test
- Password: password123
