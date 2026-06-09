import { getProducts } from '@/lib/actions/products'
import { InventoryForm } from '@/components/manager/inventory-form'

export default async function NewInventoryPage() {
  const products = await getProducts()

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Add Inventory Stock</h1>
        <p className="text-white/60">Receive new stock batch</p>
      </div>

      <div className="rounded-lg border-2 border-white/10 bg-[#3B4B5C] p-8">
        <InventoryForm products={products} />
      </div>
    </div>
  )
}
