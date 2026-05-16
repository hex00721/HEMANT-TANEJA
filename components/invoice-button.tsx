"use client"

import jsPDF from "jspdf"

export default function InvoiceButton({ order }: { order: any }) {
  const downloadInvoice = () => {
    const doc = new jsPDF()

    doc.setFontSize(22)
    doc.text("HYPERBYTE GAMING", 20, 20)

    doc.setFontSize(14)
    doc.text("Invoice Receipt", 20, 35)

    doc.setFontSize(11)
    doc.text(`Order ID: ${order.id}`, 20, 50)
    doc.text(`Customer: ${order.customerName}`, 20, 60)
    doc.text(`Email: ${order.email}`, 20, 70)
    doc.text(`Status: ${order.status}`, 20, 80)

    let y = 100

    order.items?.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.name}`, 20, y)
      doc.text(`Qty: ${item.quantity}`, 130, y)
      doc.text(`$${item.price}`, 160, y)
      y += 10
    })

    doc.setFontSize(14)
    doc.text(`Total: $${order.total?.toFixed(2)}`, 20, y + 15)

    doc.save(`invoice-${order.id}.pdf`)
  }

  return (
    <button
      onClick={downloadInvoice}
      className="inline-block mt-4 ml-4 px-6 py-3 rounded-xl bg-[var(--rgb-primary)] text-black font-bold"
    >
      Download Invoice
    </button>
  )
}