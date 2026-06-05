'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReceiptTemplate } from '@/components/receipts/receipt-template';
import type { SaleWithItems } from '@/types';

interface PrintButtonProps {
  sale: SaleWithItems;
}

export function PrintButton({ sale }: PrintButtonProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${sale.sale_number}`,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .receipt-print {
          page-break-after: always;
        }
      }
    `,
  });

  return (
    <>
      <Button
        onClick={handlePrint}
        size="lg"
        className="w-full border-4 border-[#FF6B35] bg-[#FF6B35] font-black uppercase tracking-tight text-white shadow-lg hover:bg-[#FF6B35]/90"
      >
        <Printer className="mr-2 h-5 w-5" />
        Print Receipt
      </Button>

      {/* Hidden receipt template for printing */}
      <div style={{ display: 'none' }}>
        <ReceiptTemplate ref={receiptRef} sale={sale} />
      </div>
    </>
  );
}
