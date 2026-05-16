"use client"

export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
}: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-10">

      <input
        type="text"
        placeholder="Search products or games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-zinc-900 border border-[var(--rgb-primary)] rounded-2xl p-4 outline-none"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-zinc-900 border border-[var(--rgb-primary)] rounded-2xl p-4 outline-none"
      >
        <option value="All">All</option>
        <option value="Keyboard">Keyboard</option>
        <option value="Mouse">Mouse</option>
        <option value="Headset">Headset</option>
        <option value="PC">PC</option>
        <option value="Game">Game</option>
      </select>
    </div>
  )
}