const statuses = [
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
]

export default function OrderTimeline({
  currentStatus,
}: {
  currentStatus: string
}) {
  const currentIndex = statuses.indexOf(currentStatus)

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {statuses.map((status, index) => (
        <div
          key={status}
          className={`flex-1 min-w-[180px] rounded-2xl p-4 border transition-all duration-300 ${
            index <= currentIndex
              ? "bg-[var(--rgb-primary)] text-black border-[var(--rgb-primary)]"
              : "bg-zinc-900 text-white border-zinc-700"
          }`}
        >
          <p className="font-bold">
            {status}
          </p>
        </div>
      ))}
    </div>
  )
}