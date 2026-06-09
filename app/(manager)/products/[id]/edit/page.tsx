import { getProductById } from '@/lib/actions/products'
import { ProductForm } from '@/components/manager/product-form'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const product = await getProductById(params.id)

    return (
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
          <p className="text-white/60">Update product details and pricing</p>
        </div>

        <div className="rounded-lg border-2 border-white/10 bg-[#3B4B5C] p-8">
          <ProductForm product={product} mode="edit" />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
