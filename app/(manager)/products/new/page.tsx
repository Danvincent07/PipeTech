import { ProductForm } from '@/components/manager/product-form'

export default function NewProductPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Create New Product</h1>
        <p className="text-white/60">Add a new product to your catalog</p>
      </div>

      <div className="rounded-lg border-2 border-white/10 bg-[#3B4B5C] p-8">
        <ProductForm mode="create" />
      </div>
    </div>
  )
}
