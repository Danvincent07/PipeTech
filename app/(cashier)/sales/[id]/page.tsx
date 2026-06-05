import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Receipt, User, Calendar, CreditCard } from 'lucide-react';
import { getSaleById } from '@/lib/actions/sales';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PrintButton } from './print-button';

interface SaleDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function SaleDetailsPage({ params }: SaleDetailsPageProps) {
  const sale = await getSaleById(params.id);

  if (!sale) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-12 w-12 border-4 border-[#3B4B5C] shadow-lg"
          >
            <Link href="/sales">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border-4 border-[#3B4B5C] bg-[#2C7DA0] shadow-xl">
            <Receipt className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#3B4B5C]">
              Sale Details
            </h1>
            <p className="mt-1 font-mono text-lg font-bold text-[#2C7DA0]">
              {sale.sale_number}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sale Information */}
        <div className="space-y-6 lg:col-span-2">
          {/* Items Table */}
          <div className="rounded-lg border-4 border-[#3B4B5C] bg-white shadow-2xl">
            <div className="border-b-4 border-[#3B4B5C] bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#3B4B5C]">
                Items Sold
              </h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-gray-200">
                    <TableHead className="font-bold uppercase tracking-tight text-[#3B4B5C]">
                      Product
                    </TableHead>
                    <TableHead className="text-center font-bold uppercase tracking-tight text-[#3B4B5C]">
                      Qty
                    </TableHead>
                    <TableHead className="text-right font-bold uppercase tracking-tight text-[#3B4B5C]">
                      Price
                    </TableHead>
                    <TableHead className="text-right font-bold uppercase tracking-tight text-[#3B4B5C]">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale.items.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-gray-100"
                    >
                      <TableCell className="font-semibold">
                        <div>
                          <p className="font-bold text-[#3B4B5C]">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            SKU: {item.product.sku}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-lg font-black text-[#3B4B5C]">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ₱{item.unit_price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-lg font-black text-[#2C7DA0]">
                        ₱{item.line_total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow className="border-t-4 border-[#3B4B5C] bg-gray-50">
                    <TableCell
                      colSpan={3}
                      className="text-right text-lg font-black uppercase tracking-tight text-[#3B4B5C]"
                    >
                      Subtotal
                    </TableCell>
                    <TableCell className="text-right text-lg font-bold">
                      ₱{sale.subtotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                  {sale.tax_total > 0 && (
                    <TableRow className="bg-gray-50">
                      <TableCell
                        colSpan={3}
                        className="text-right text-lg font-black uppercase tracking-tight text-[#3B4B5C]"
                      >
                        Tax
                      </TableCell>
                      <TableCell className="text-right text-lg font-bold">
                        ₱{sale.tax_total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className="border-t-4 border-[#FF6B35] bg-[#FF6B35]/10">
                    <TableCell
                      colSpan={3}
                      className="text-right text-xl font-black uppercase tracking-tight text-[#3B4B5C]"
                    >
                      Grand Total
                    </TableCell>
                    <TableCell className="text-right text-2xl font-black text-[#FF6B35]">
                      ₱{sale.grand_total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>

        {/* Sale Metadata */}
        <div className="space-y-6">
          {/* Payment Information */}
          <div className="rounded-lg border-4 border-[#3B4B5C] bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-[#3B4B5C]">
              Payment Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-1 h-5 w-5 text-[#2C7DA0]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    Payment Method
                  </p>
                  <p className="mt-1 inline-flex rounded-md border-2 border-[#3B4B5C] bg-white px-3 py-1 text-sm font-black uppercase tracking-tight text-[#3B4B5C]">
                    {sale.payment_method}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded-full border-2 border-[#2C7DA0] bg-[#2C7DA0]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    Amount Paid
                  </p>
                  <p className="mt-1 text-lg font-black text-[#3B4B5C]">
                    ₱{sale.amount_paid.toFixed(2)}
                  </p>
                </div>
              </div>

              {sale.payment_method === 'cash' &&
                sale.amount_paid > sale.grand_total && (
                  <div className="rounded-lg border-2 border-[#2C7DA0] bg-[#2C7DA0]/10 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#3B4B5C]">
                      Change Given
                    </p>
                    <p className="mt-1 text-lg font-black text-[#2C7DA0]">
                      ₱{(sale.amount_paid - sale.grand_total).toFixed(2)}
                    </p>
                  </div>
                )}

              <div className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 rounded border-2 border-green-600 bg-green-600">
                  <svg
                    className="h-full w-full text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    Status
                  </p>
                  <p className="mt-1 inline-flex rounded-md border-2 border-green-600 bg-green-50 px-3 py-1 text-sm font-black uppercase tracking-tight text-green-700">
                    {sale.payment_status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="rounded-lg border-4 border-[#3B4B5C] bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-black uppercase tracking-tight text-[#3B4B5C]">
              Transaction Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 text-[#2C7DA0]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    Sale Date
                  </p>
                  <p className="mt-1 font-semibold text-[#3B4B5C]">
                    {new Date(sale.sale_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="mt-1 h-5 w-5 text-[#2C7DA0]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    Cashier
                  </p>
                  <p className="mt-1 font-bold text-[#3B4B5C]">
                    {sale.cashier.full_name}
                  </p>
                </div>
              </div>

              {sale.notes && (
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
                    Notes
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {sale.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Print Receipt */}
          <div>
            <PrintButton sale={sale} />
          </div>
        </div>
      </div>
    </div>
  );
}
