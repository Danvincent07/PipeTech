# Complete User Setup Guide

## Step 1: Verify/Create Auth Users

1. **Go to Supabase Auth Dashboard:**
   https://supabase.com/dashboard/project/lhfqzdqphczskaxavuee/auth/users

2. **Check if users exist:**
   - Look for `cashier@hollowblocks.test`
   - Look for `manager@hollowblocks.test`

3. **If they DON'T exist, create them:**
   
   ### Create Cashier User:
   - Click **"Add User"** button (top right)
   - Select **"Create new user"**
   - Fill in:
     - Email: `cashier@hollowblocks.test`
     - Password: `password123`
     - ✅ **IMPORTANT:** Check "Auto Confirm User"
   - Click **"Create user"**

   ### Create Manager User:
   - Click **"Add User"** again
   - Select **"Create new user"**
   - Fill in:
     - Email: `manager@hollowblocks.test`
     - Password: `password123`
     - ✅ **IMPORTANT:** Check "Auto Confirm User"
   - Click **"Create user"**

---

## Step 2: Link Users to Application Roles

1. **Go to SQL Editor:**
   https://supabase.com/dashboard/project/lhfqzdqphczskaxavuee/sql/new

2. **First, verify the auth users exist with this query:**

```sql
-- Check if auth users exist
SELECT id, email, created_at 
FROM auth.users 
WHERE email IN ('cashier@hollowblocks.test', 'manager@hollowblocks.test');
```

   **Expected result:** Should show 2 rows with the user IDs and emails

3. **If Step 2 shows the users, run this to link them:**

```sql
-- Link auth users to application roles
INSERT INTO users (id, email, full_name, role, is_active) 
VALUES
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

---

## Step 3: Verify Setup

Run this query to confirm everything is linked:

```sql
-- Verify users are properly set up
SELECT u.id, u.email, u.full_name, u.role, u.is_active
FROM users u
WHERE u.email IN ('cashier@hollowblocks.test', 'manager@hollowblocks.test');
```

**Expected result:** Should show 2 rows with all user details

---

## Step 4: Test Login

1. Go to: http://localhost:3001
2. Login with:
   - Email: `cashier@hollowblocks.test`
   - Password: `password123`

---

## Troubleshooting

**If verification query (Step 2) shows no results:**
- The auth users don't exist - go back to Step 1 and create them

**If you get "null value in column id" error:**
- The auth users don't exist - go back to Step 1

**If login still doesn't work:**
- Check browser console for errors (F12)
- Verify .env.local has correct Supabase credentials
- Make sure dev server is running

