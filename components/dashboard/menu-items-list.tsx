"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Trash2, Edit2 } from "lucide-react"

interface MenuItem {
  _id: string
  title: string
  description: string
  price: number
  imageUrl: string
  categories: string[]
}

export default function MenuItemsList() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchMenuItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, selectedCategory, searchTerm])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`)
      if (!response.ok) throw new Error("Failed to fetch menu items")
      const data = await response.json()
      setItems(data)

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data.flatMap((item: MenuItem) => item.categories))) as string[]
      setCategories(uniqueCategories)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu items")
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = items

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.categories.includes(selectedCategory))
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete item")
      setItems(items.filter((item) => item._id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-slate-400">Loading menu items...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-900/20 border border-red-700 text-red-400 p-4 rounded-lg">{error}</div>}

      <div className="space-y-4">
        <Input
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setSelectedCategory("all")}
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={
              selectedCategory === "all"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "border-slate-600 text-slate-300 hover:bg-slate-700"
            }
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item._id}
            className="bg-slate-800 border-slate-700 overflow-hidden hover:border-emerald-500 transition-colors"
          >
            <div className="relative h-48 bg-slate-700">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = "/placeholder.svg?height=200&width=300"
                }}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-white">{item.title}</CardTitle>
              <CardDescription className="text-slate-400">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-emerald-500">${item.price}</span>
                <div className="flex gap-2">
                  {item.categories.map((cat) => (
                    <span key={cat} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/edit/${item._id}`} className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No menu items found</p>
        </div>
      )}
    </div>
  )
}
