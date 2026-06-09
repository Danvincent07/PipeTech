'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { inventoryBatchSchema } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createInventoryBatch } from '@/lib/actions/inventory'
import type { ProductWithStock } from '@/types'
import { z } from 'zod'

type InventoryFormData = z.infer<typeof inventoryBatchSchema>

interface InventoryFormProps {
  products: ProductWithStock[]
}

export function InventoryForm({ products }: InventoryFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InventoryFormData>({
    resolver: zodResolver(inventoryBatchSchema),
    defaultValues: {
      received_date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: InventoryFormData) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    try {
      await createInventoryBatch(formData)
      router.push('/manager/inventory')
      router.refresh()
    } catch (error) {
      console.error('Form submission error:', error)
      alert(error instanceof Error ? error.message : 'Failed to add inventory')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Product Selection */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="product_id" className="text-white font-bold">Product</Label>
          <Select onValueChange={(value) => setValue('product_id', value)}>
            <SelectTrigger className="bg-[#2A2D34] border-white/20 text-white">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} ({product.sku})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.product_id && (
            <p className="text-sm text-red-400">{errors.product_id.message}</p>
          )}
        </div>

        {/* Batch Number */}
        <div className="space-y-2">
          <Label htmlFor="batch_number" className="text-white font-bold">Batch Number</Label>
          <Input
            id="batch_number"
            {...register('batch_number')}
            placeholder="e.g., BATCH-20260609-001"
            className="bg-[#2A2D34] border-white/20 text-white font-mono"
          />
          {errors.batch_number && (
            <p className="text-sm text-red-400">{errors.batch_number.message}</p>
          )}
        </div>

        {/* Received Date */}
        <div className="space-y-2">
          <Label htmlFor="received_date" className="text-white font-bold">Received Date</Label>
          <Input
            id="received_date"
            type="date"
            {...register('received_date')}
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.received_date && (
            <p className="text-sm text-red-400">{errors.received_date.message}</p>
          )}
        </div>

        {/* Quantity Received */}
        <div className="space-y-2">
          <Label htmlFor="quantity_received" className="text-white font-bold">Quantity Received</Label>
          <Input
            id="quantity_received"
            type="number"
            {...register('quantity_received', { valueAsNumber: true })}
            placeholder="e.g., 1000"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.quantity_received && (
            <p className="text-sm text-red-400">{errors.quantity_received.message}</p>
          )}
        </div>

        {/* Cost Per Unit */}
        <div className="space-y-2">
          <Label htmlFor="cost_per_unit" className="text-white font-bold">Cost Per Unit (₱)</Label>
          <Input
            id="cost_per_unit"
            type="number"
            step="0.01"
            {...register('cost_per_unit', { valueAsNumber: true })}
            placeholder="e.g., 8.00"
            className="bg-[#2A2D34] border-white/20 text-white"
          />
          {errors.cost_per_unit && (
            <p className="text-sm text-red-400">{errors.cost_per_unit.message}</p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes" className="text-white font-bold">Notes (Optional)</Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Any additional information about this batch..."
            className="bg-[#2A2D34] border-white/20 text-white"
            rows={3}
          />
          {errors.notes && (
            <p className="text-sm text-red-400">{errors.notes.message}</p>
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
          {isSubmitting ? 'Adding...' : 'Add Stock'}
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
