'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createProduct, updateProduct } from '@/lib/actions/products'
import type { Product } from '@/types'
import { z } from 'zod'

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product
  mode: 'create' | 'edit'
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      sku: product.sku,
      size_inches: product.size_inches,
      unit_price_retail: Number(product.unit_price_retail),
      unit_price_wholesale: Number(product.unit_price_wholesale),
      reorder_threshold: product.reorder_threshold,
      reorder_quantity: product.reorder_quantity,
    } : {
      reorder_threshold: 100,
      reorder_quantity: 500,
    },
  })

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    try {
      if (mode === 'create') {
        await createProduct(formData)
      } else if (product) {
        await updateProduct(product.id, formData)
      }
      router.push('/manager/products')
      router.refresh()
    } catch (error) {
      console.error('Form submission error:', error)
      alert(error instanceof Error ? error.message : 'Failed to save product')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white font-bold">Product Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="e.g., 4-inch Hollow Block"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <Label htmlFor="sku" className="text-white font-bold">SKU</Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder="e.g., HB-4"
            className="bg-[#2A2D34] border-white/20 text-white font-mono"
          />
          {errors.sku && (
            <p className="text-sm text-red-400">{errors.sku.message}</p>
          )}
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label htmlFor="size_inches" className="text-white font-bold">Size (inches)</Label>
          <Input
            id="size_inches"
            type="number"
            {...register('size_inches', { valueAsNumber: true })}
            placeholder="e.g., 4"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.size_inches && (
            <p className="text-sm text-red-400">{errors.size_inches.message}</p>
          )}
        </div>

        {/* Retail Price */}
        <div className="space-y-2">
          <Label htmlFor="unit_price_retail" className="text-white font-bold">Retail Price (₱)</Label>
          <Input
            id="unit_price_retail"
            type="number"
            step="0.01"
            {...register('unit_price_retail', { valueAsNumber: true })}
            placeholder="e.g., 12.00"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.unit_price_retail && (
            <p className="text-sm text-red-400">{errors.unit_price_retail.message}</p>
          )}
        </div>

        {/* Wholesale Price */}
        <div className="space-y-2">
          <Label htmlFor="unit_price_wholesale" className="text-white font-bold">Wholesale Price (₱)</Label>
          <Input
            id="unit_price_wholesale"
            type="number"
            step="0.01"
            {...register('unit_price_wholesale', { valueAsNumber: true })}
            placeholder="e.g., 10.00"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.unit_price_wholesale && (
            <p className="text-sm text-red-400">{errors.unit_price_wholesale.message}</p>
          )}
        </div>

        {/* Reorder Threshold */}
        <div className="space-y-2">
          <Label htmlFor="reorder_threshold" className="text-white font-bold">Reorder Threshold</Label>
          <Input
            id="reorder_threshold"
            type="number"
            {...register('reorder_threshold', { valueAsNumber: true })}
            placeholder="e.g., 100"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.reorder_threshold && (
            <p className="text-sm text-red-400">{errors.reorder_threshold.message}</p>
          )}
        </div>

        {/* Reorder Quantity */}
        <div className="space-y-2">
          <Label htmlFor="reorder_quantity" className="text-white font-bold">Reorder Quantity</Label>
          <Input
            id="reorder_quantity"
            type="number"
            {...register('reorder_quantity', { valueAsNumber: true })}
            placeholder="e.g., 500"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.reorder_quantity && (
            <p className="text-sm text-red-400">{errors.reorder_quantity.message}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 font-bold"
        >
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-white/20 text-white hover:bg-white/5"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
