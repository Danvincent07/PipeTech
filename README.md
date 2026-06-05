# Hollow Blocks POS System

A modern, industrial-themed Point of Sale system for hollow block manufacturing and retail businesses. Built with Next.js 16, Supabase, and TypeScript.

## Features

### Core Functionality
- **Point of Sale (POS)**: Touch-friendly cashier interface with real-time inventory
- **Product Management**: CRUD operations for hollow block products with SKU tracking
- **Inventory Management**: FIFO batch tracking with cost per unit and stock monitoring
- **Sales History**: Complete transaction history with detailed sale views
- **Receipt Printing**: Thermal receipt generation (80mm width) with print functionality

### Design System
Industrial Precision theme with:
- Concrete Gray (#3B4B5C) - Primary borders and text
- Steel Blue (#2C7DA0) - Interactive elements and accents
- Safety Orange (#FF6B35) - CTAs and important actions
- Bold 4px borders and large shadows for industrial feel
- Touch-friendly targets (minimum 44px)

### Technical Features
- Server-side rendering with Next.js App Router
- Type-safe database queries with Supabase
- FIFO (First-In-First-Out) inventory deduction
- Real-time stock updates
- Responsive design (mobile-first)
- Role-based access control (Cashier/Manager)

## Tech Stack

- **Framework**: Next.js 16.2.7 (React 19)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Authentication**: Supabase Auth
- **Printing**: react-to-print
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 20+ 
- npm/yarn/pnpm
- Supabase account
- Modern browser with JavaScript enabled

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd hollow-blocks-pos
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Supabase

#### Create a new Supabase project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to be provisioned

#### Run database migrations
```bash
# Navigate to supabase directory
cd supabase

# Run the seed SQL
# Copy the contents of seed.sql and run it in your Supabase SQL Editor
```

The seed file includes:
- Database schema (products, inventory_batches, sales, sale_items, users)
- Sample data (products, inventory batches, user accounts)
- Database functions (generate_sale_number)

### 4. Configure environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings:
- Project URL: Settings → API → Project URL
- Anon Key: Settings → API → Project API keys → anon/public

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Default Credentials

The seed file creates a test user:

```
Email: cashier@test.com
Password: password123
Role: cashier
```

**Important**: Change these credentials in production!

## Project Structure

```
hollow-blocks-pos/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/           # Login page
│   │   └── layout.tsx       # Auth layout (centered)
│   ├── (cashier)/           # Protected cashier routes
│   │   ├── pos/             # Point of Sale
│   │   │   ├── components/  # POS components
│   │   │   │   ├── pos-client.tsx
│   │   │   │   ├── product-grid.tsx
│   │   │   │   ├── cart.tsx
│   │   │   │   └── checkout-modal.tsx
│   │   │   ├── actions.ts   # Sale completion logic
│   │   │   └── page.tsx
│   │   ├── products/        # Product management
│   │   │   ├── [id]/edit/   # Edit product
│   │   │   ├── new/         # Add new product
│   │   │   └── page.tsx     # Product list
│   │   ├── inventory/       # Inventory management
│   │   │   ├── new/         # Receive inventory
│   │   │   └── page.tsx     # Batch list
│   │   ├── sales/           # Sales history
│   │   │   ├── [id]/        # Sale details + print
│   │   │   └── page.tsx     # Sales list
│   │   └── layout.tsx       # Main app layout
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home redirect
├── components/
│   ├── receipts/
│   │   └── receipt-template.tsx  # Thermal receipt
│   ├── ui/                  # shadcn/ui components
│   └── navigation.tsx       # Main navigation
├── lib/
│   ├── actions/             # Server actions
│   │   ├── products.ts
│   │   ├── inventory.ts
│   │   └── sales.ts
│   ├── supabase/            # Supabase clients
│   │   ├── client.ts        # Browser client
│   │   └── server.ts        # Server client
│   ├── validations/         # Zod schemas
│   └── utils.ts             # Utility functions
├── types/
│   ├── database.types.ts    # Generated from Supabase
│   └── index.ts             # Type exports
├── supabase/
│   └── seed.sql             # Database schema + seed data
└── middleware.ts            # Auth middleware
```

## Key Files

### Database Types
- `types/database.types.ts`: Auto-generated from Supabase schema
- `types/index.ts`: Application-level types and interfaces

### Server Actions
- `lib/actions/products.ts`: Product CRUD operations
- `lib/actions/inventory.ts`: Inventory batch management, FIFO logic
- `lib/actions/sales.ts`: Sales queries and statistics
- `app/(cashier)/pos/actions.ts`: Sale completion with FIFO deduction

### Components
- `app/(cashier)/pos/components/`: POS-specific components
- `components/receipts/receipt-template.tsx`: Printable receipt
- `components/ui/`: Reusable UI components from shadcn

## Database Schema

### Tables

#### products
- Product catalog (name, SKU, pricing, reorder thresholds)
- Tracks retail and wholesale prices

#### inventory_batches
- FIFO batch tracking
- Each batch has: received quantity, current quantity, cost, date
- Linked to products via `product_id`

#### sales
- Sale header (totals, payment info, cashier)
- Auto-generated sale numbers
- Tracks payment method (cash/card) and status

#### sale_items
- Line items for each sale
- Links to products and batches
- Records quantity, unit price, line total

#### users
- User accounts linked to Supabase Auth
- Roles: cashier, manager
- Tracks full name and active status

### Relationships
- `inventory_batches.product_id` → `products.id`
- `sales.cashier_id` → `users.id`
- `sale_items.sale_id` → `sales.id`
- `sale_items.product_id` → `products.id`
- `sale_items.batch_id` → `inventory_batches.id`

## Features in Detail

### FIFO Inventory Logic

When a sale is completed:
1. System fetches all available batches for each product (ordered by received_date ASC)
2. Allocates quantity from oldest batches first
3. Creates sale_items records linking to specific batches
4. Updates batch.quantity_current atomically
5. Ensures stock availability before committing sale

### Receipt Printing

- Thermal receipt template (80mm width)
- Monospaced font for clean alignment
- Includes: company info, sale details, items, totals, payment info
- Print via browser print dialog
- Optimized for thermal printers (no margins, clean layout)

### Payment Processing

**Cash Payments**:
- Validates amount paid ≥ total
- Calculates and displays change
- Records exact amounts

**Card Payments**:
- Amount paid = grand total (exact)
- No change calculation
- Instant completion

### Authentication Flow

1. User visits any protected route
2. Middleware checks for Supabase session
3. If no session → redirect to /login
4. After login → redirect to original destination or /pos
5. Role-based access (currently cashier-only routes)

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run Jest tests
```

## Development Workflow

1. **Adding a Product**
   - Navigate to Products → Add New Product
   - Fill in details (name, SKU, sizes, pricing)
   - Submit to create

2. **Receiving Inventory**
   - Navigate to Inventory → Receive Inventory
   - Select product, enter batch details
   - System creates new batch and updates stock

3. **Making a Sale**
   - Navigate to POS
   - Add products to cart (click product cards)
   - Adjust quantities as needed
   - Click Checkout
   - Select payment method
   - Complete sale

4. **Viewing Sales**
   - Navigate to Sales History
   - View all transactions
   - Click View on any sale to see details
   - Print receipt from sale details page

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. Deploy

### Other Platforms

Supports any platform that runs Node.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

Ensure you:
- Set environment variables
- Use Node.js 20+
- Configure build command: `npm run build`
- Configure start command: `npm start`

## Environment Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |

## Troubleshooting

### Database connection errors
- Verify environment variables are correct
- Check Supabase project is active
- Ensure database schema is migrated

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

### Authentication issues
- Clear browser cookies/localStorage
- Check Supabase Auth settings
- Verify middleware.ts is configured correctly

### Print not working
- Ensure browser has print permissions
- Check react-to-print is installed: `npm list react-to-print`
- Test with browser print preview (Ctrl/Cmd + P)

## Future Enhancements

Potential features for future development:
- [ ] Manager dashboard with analytics
- [ ] Barcode scanning for products
- [ ] Multiple location support
- [ ] Customer management
- [ ] Discount and promotion system
- [ ] Return/refund processing
- [ ] Expense tracking
- [ ] Advanced reporting (daily, weekly, monthly)
- [ ] Email receipts
- [ ] Export sales data (CSV, Excel)
- [ ] Dark mode support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues or questions:
- Open an issue in the repository
- Contact the development team

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Database by [Supabase](https://supabase.com)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

---

**Made with industrial precision for PipeTech Solutions**
