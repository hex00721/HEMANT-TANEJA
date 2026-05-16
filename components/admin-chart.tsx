"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

export default function AdminChart({
  orders,
  products,
}: {
  orders: any[]
  products: any[]
}) {
  const revenue = orders.reduce((acc, order) => acc + (order.total || 0), 0)

  const delivered = orders.filter((order) => order.status === "Delivered").length

  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("default", {
      month: "short",
    })

    const monthRevenue = orders
      .filter((order) => {
        const date = order.createdAt?.toDate?.()
        return date && date.getMonth() === i
      })
      .reduce((sum, order) => sum + (order.total || 0), 0)

    return {
      month,
      revenue: monthRevenue,
      orders: orders.filter((order) => {
        const date = order.createdAt?.toDate?.()
        return date && date.getMonth() === i
      }).length,
    }
  })

  return (
    <div className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-3xl p-8 shadow-[0_0_30px_var(--rgb-primary)]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-[var(--rgb-primary)]">
          Monthly Analytics
        </h2>

        <div className="px-5 py-2 rounded-xl bg-[var(--rgb-primary)] text-black font-bold">
          LIVE
        </div>
      </div>

      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyRevenue}>
            <CartesianGrid stroke="#222" strokeDasharray="5 5" />

            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid var(--rgb-primary)",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="var(--rgb-primary)"
              strokeWidth={5}
              dot={{ r: 7, fill: "var(--rgb-primary)" }}
              activeDot={{ r: 11 }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ r: 5, fill: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div className="bg-black rounded-2xl p-5 border border-[var(--rgb-primary)]">
          <p className="text-gray-400 mb-2">Total Revenue</p>
          <h3 className="text-3xl font-bold text-[var(--rgb-primary)]">
            ${revenue.toFixed(2)}
          </h3>
        </div>

        <div className="bg-black rounded-2xl p-5 border border-[var(--rgb-primary)]">
          <p className="text-gray-400 mb-2">Orders</p>
          <h3 className="text-3xl font-bold text-[var(--rgb-primary)]">
            {orders.length}
          </h3>
        </div>

        <div className="bg-black rounded-2xl p-5 border border-[var(--rgb-primary)]">
          <p className="text-gray-400 mb-2">Products</p>
          <h3 className="text-3xl font-bold text-[var(--rgb-primary)]">
            {products.length}
          </h3>
        </div>

        <div className="bg-black rounded-2xl p-5 border border-[var(--rgb-primary)]">
          <p className="text-gray-400 mb-2">Delivered</p>
          <h3 className="text-3xl font-bold text-[var(--rgb-primary)]">
            {delivered}
          </h3>
        </div>
      </div>
    </div>
  )
}