'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { PaymentMethod } from '@/types';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (paymentData: {
    paymentMethod: PaymentMethod;
    amountPaid: number;
    notes?: string;
  }) => Promise<void>;
  total: number;
}

export function CheckoutModal({
  open,
  onClose,
  onConfirm,
  total,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [amountPaid, setAmountPaid] = useState(total.toString());
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await onConfirm({
        paymentMethod,
        amountPaid: parseFloat(amountPaid),
        notes: notes.trim() || undefined,
      });
      // Reset form
      setPaymentMethod('cash');
      setAmountPaid(total.toString());
      setNotes('');
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const amountPaidNum = parseFloat(amountPaid) || 0;
  const change = amountPaidNum - total;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-4 border-[#3B4B5C] bg-white shadow-2xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-[#3B4B5C]">
            Complete Sale
          </DialogTitle>
          <DialogDescription className="text-base font-semibold text-gray-600">
            Process payment and complete the transaction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Total Amount */}
          <div className="rounded-lg border-4 border-[#FF6B35] bg-[#FF6B35]/10 p-4">
            <p className="text-sm font-bold uppercase tracking-wide text-[#3B4B5C]">
              Total Amount
            </p>
            <p className="mt-1 text-3xl font-black text-[#FF6B35]">
              ₱{total.toFixed(2)}
            </p>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-sm font-bold uppercase tracking-wide text-[#3B4B5C]">
              Payment Method
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem
                  value="cash"
                  id="cash"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="cash"
                  className="flex cursor-pointer items-center justify-center rounded-lg border-4 border-[#3B4B5C] bg-white px-6 py-4 font-black uppercase tracking-tight text-[#3B4B5C] shadow-lg transition-all hover:border-[#2C7DA0] hover:bg-[#2C7DA0]/5 peer-data-[state=checked]:border-[#2C7DA0] peer-data-[state=checked]:bg-[#2C7DA0] peer-data-[state=checked]:text-white"
                >
                  Cash
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="flex cursor-pointer items-center justify-center rounded-lg border-4 border-[#3B4B5C] bg-white px-6 py-4 font-black uppercase tracking-tight text-[#3B4B5C] shadow-lg transition-all hover:border-[#2C7DA0] hover:bg-[#2C7DA0]/5 peer-data-[state=checked]:border-[#2C7DA0] peer-data-[state=checked]:bg-[#2C7DA0] peer-data-[state=checked]:text-white"
                >
                  Card
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Amount Paid (Cash only) */}
          {paymentMethod === 'cash' && (
            <div className="space-y-3">
              <Label
                htmlFor="amountPaid"
                className="text-sm font-bold uppercase tracking-wide text-[#3B4B5C]"
              >
                Amount Paid
              </Label>
              <Input
                id="amountPaid"
                type="number"
                step="0.01"
                min={total}
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="h-14 border-4 border-[#3B4B5C] text-lg font-bold shadow-lg focus-visible:border-[#2C7DA0] focus-visible:ring-4 focus-visible:ring-[#2C7DA0]/20"
                required
              />
              {change > 0 && (
                <div className="rounded-lg border-4 border-[#2C7DA0] bg-[#2C7DA0]/10 p-3">
                  <p className="text-sm font-bold uppercase tracking-wide text-[#3B4B5C]">
                    Change Due
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#2C7DA0]">
                    ₱{change.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-3">
            <Label
              htmlFor="notes"
              className="text-sm font-bold uppercase tracking-wide text-[#3B4B5C]"
            >
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this sale..."
              className="min-h-[80px] resize-none border-4 border-[#3B4B5C] font-medium shadow-lg focus-visible:border-[#2C7DA0] focus-visible:ring-4 focus-visible:ring-[#2C7DA0]/20"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 border-4 border-[#3B4B5C] bg-white font-black uppercase tracking-tight text-[#3B4B5C] shadow-lg hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isProcessing ||
                (paymentMethod === 'cash' && amountPaidNum < total)
              }
              className="flex-1 border-4 border-[#FF6B35] bg-[#FF6B35] font-black uppercase tracking-tight text-white shadow-lg hover:bg-[#FF6B35]/90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Complete Sale'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
