import { Suspense } from 'react';
import Link from 'next/link';
import { Receipt, Eye } from 'lucide-react';
import { getSales } from '@/lib/actions/sales';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function SalesPage() {
  const sales = await getSales();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg border-4 border-[#3B4B5C] bg-[#2C7DA0] shadow-xl">
          <Receipt className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#3B4B5C]">
            Sales History
          </h1>
          <p className="mt-1 text-base font-semibold text-gray-600">
            View all completed transactions
          </p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="rounded-lg border-4 border-[#3B4B5C] bg-white shadow-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-4 border-[#3B4B5C] bg-gray-50">
                <TableHead className="font-black uppercase tracking-tight text-[#3B4B5C]">
                  Sale #
                </TableHead>
                <TableHead className="font-black uppercase tracking-tight text-[#3B4B5C]">
                  Date
                </TableHead>
                <TableHead className="font-black uppercase tracking-tight text-[#3B4B5C]">
                  Cashier
                </TableHead>
                <TableHead className="font-black uppercase tracking-tight text-[#3B4B5C]">
                  Items
                </TableHead>
                <TableHead className="font-black uppercase tracking-tight text-[#3B4B5C]">
                  Payment
                </TableHead>
                <TableHead className="text-right font-black uppercase tracking-tight text-[#3B4B5C]">
                  Total
                </TableHead>
                <TableHead className="text-right font-black uppercase tracking-tight text-[#3B4B5C]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-base font-semibold text-gray-500"
                  >
                    No sales found
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((sale) => (
                  <TableRow
                    key={sale.id}
                    className="border-b-2 border-gray-200 transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="font-mono text-sm font-bold text-[#2C7DA0]">
                      {sale.sale_number}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {new Date(sale.sale_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {sale.cashier.full_name}
                    </TableCell>
                    <TableCell className="font-bold text-[#3B4B5C]">
                      {sale.items.length}{' '}
                      {sale.items.length === 1 ? 'item' : 'items'}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-md border-2 border-[#3B4B5C] bg-white px-3 py-1 text-xs font-black uppercase tracking-tight text-[#3B4B5C]">
                        {sale.payment_method}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-lg font-black text-[#FF6B35]">
                      ₱{sale.grand_total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        asChild
                        size="sm"
                        className="border-2 border-[#2C7DA0] bg-[#2C7DA0] font-bold uppercase tracking-tight text-white shadow-lg hover:bg-[#2C7DA0]/90"
                      >
                        <Link href={`/sales/${sale.id}`}>
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
