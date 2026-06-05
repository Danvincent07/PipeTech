import { forwardRef } from 'react';
import type { SaleWithItems } from '@/types';

interface ReceiptTemplateProps {
  sale: SaleWithItems;
}

/**
 * Thermal receipt template (80mm width)
 * Designed for thermal printers with clean, monospaced layout
 */
export const ReceiptTemplate = forwardRef<HTMLDivElement, ReceiptTemplateProps>(
  ({ sale }, ref) => {
    return (
      <div
        ref={ref}
        className="receipt-print"
        style={{
          width: '80mm',
          padding: '10mm',
          fontFamily: 'monospace',
          fontSize: '12px',
          lineHeight: '1.4',
          color: '#000',
          backgroundColor: '#fff',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8mm' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '2mm',
            }}
          >
            HOLLOW BLOCKS POS
          </div>
          <div style={{ fontSize: '10px' }}>
            PipeTech Industrial Solutions
          </div>
          <div style={{ fontSize: '10px' }}>Contact: (123) 456-7890</div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '2px dashed #000',
            marginBottom: '4mm',
          }}
        />

        {/* Sale Info */}
        <div style={{ marginBottom: '4mm' }}>
          <table style={{ width: '100%', fontSize: '10px' }}>
            <tbody>
              <tr>
                <td>Receipt #:</td>
                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                  {sale.sale_number}
                </td>
              </tr>
              <tr>
                <td>Date:</td>
                <td style={{ textAlign: 'right' }}>
                  {new Date(sale.sale_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
              <tr>
                <td>Cashier:</td>
                <td style={{ textAlign: 'right' }}>{sale.cashier.full_name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '2px dashed #000',
            marginBottom: '4mm',
          }}
        />

        {/* Items */}
        <div style={{ marginBottom: '4mm' }}>
          {sale.items.map((item, index) => (
            <div key={item.id} style={{ marginBottom: '3mm' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '11px',
                  marginBottom: '1mm',
                }}
              >
                {item.product.name}
              </div>
              <table style={{ width: '100%', fontSize: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '40%' }}>
                      {item.quantity} x ₱{item.unit_price.toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                      ₱{item.line_total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '2px dashed #000',
            marginBottom: '4mm',
          }}
        />

        {/* Totals */}
        <div style={{ marginBottom: '4mm' }}>
          <table style={{ width: '100%', fontSize: '11px' }}>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td style={{ textAlign: 'right' }}>
                  ₱{sale.subtotal.toFixed(2)}
                </td>
              </tr>
              {sale.tax_total > 0 && (
                <tr>
                  <td>Tax:</td>
                  <td style={{ textAlign: 'right' }}>
                    ₱{sale.tax_total.toFixed(2)}
                  </td>
                </tr>
              )}
              <tr
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  borderTop: '1px solid #000',
                }}
              >
                <td style={{ paddingTop: '2mm' }}>TOTAL:</td>
                <td style={{ textAlign: 'right', paddingTop: '2mm' }}>
                  ₱{sale.grand_total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Info */}
        <div style={{ marginBottom: '4mm' }}>
          <table style={{ width: '100%', fontSize: '10px' }}>
            <tbody>
              <tr>
                <td>Payment Method:</td>
                <td
                  style={{
                    textAlign: 'right',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  {sale.payment_method}
                </td>
              </tr>
              <tr>
                <td>Amount Paid:</td>
                <td style={{ textAlign: 'right' }}>
                  ₱{sale.amount_paid.toFixed(2)}
                </td>
              </tr>
              {sale.payment_method === 'cash' &&
                sale.amount_paid > sale.grand_total && (
                  <tr>
                    <td>Change:</td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                      ₱{(sale.amount_paid - sale.grand_total).toFixed(2)}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>

        {/* Notes */}
        {sale.notes && (
          <div style={{ marginBottom: '4mm', fontSize: '10px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '1mm' }}>
              Notes:
            </div>
            <div style={{ fontStyle: 'italic' }}>{sale.notes}</div>
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            borderTop: '2px dashed #000',
            marginTop: '6mm',
            marginBottom: '4mm',
          }}
        />

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: '10px' }}>
          <div style={{ marginBottom: '2mm' }}>Thank you for your purchase!</div>
          <div style={{ fontSize: '9px', fontStyle: 'italic' }}>
            This serves as your official receipt
          </div>
          <div style={{ fontSize: '9px', marginTop: '2mm' }}>
            Powered by Hollow Blocks POS System
          </div>
        </div>
      </div>
    );
  }
);

ReceiptTemplate.displayName = 'ReceiptTemplate';
