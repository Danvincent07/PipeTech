import { getInventoryBatches } from '@/lib/actions/inventory'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function InventoryPage() {
  const batches = await getInventoryBatches()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Inventory Batches</h1>
          <p className="text-white/60">Manage stock batches and FIFO tracking</p>
        </div>
        <Link href="/manager/inventory/new">
          <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 font-bold">
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </Link>
      </div>

      {/* Inventory Table */}
      <div className="rounded-lg border-2 border-white/10 bg-[#3B4B5C] overflow-hidden">
        <table className="w-full">
          <thead className="border-b-2 border-white/10 bg-[#2A2D34]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Batch #</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Product</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Received</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Cost/Unit</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Received Qty</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Current Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {batches.map((batch) => (
              <tr key={batch.id} className="hover:bg-white/5">
                <td className="px-6 py-4 font-mono text-sm text-white/80">{batch.batch_number}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-white">{batch.product?.name}</div>
                  <div className="text-sm text-white/60 font-mono">{batch.product?.sku}</div>
                </td>
                <td className="px-6 py-4 text-white/80">{formatDate(batch.received_date)}</td>
                <td className="px-6 py-4 font-semibold text-[#FF6B35]">
                  {formatCurrency(Number(batch.cost_per_unit))}
                </td>
                <td className="px-6 py-4 text-white/80">{batch.quantity_received}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold ${batch.quantity_current === 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {batch.quantity_current}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
