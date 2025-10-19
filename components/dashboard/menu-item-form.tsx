"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface MenuItem {
  _id?: string
  title: string
  description: string
  price: number
  imageUrl: string
  categories: string[]
}

const AVAILABLE_CATEGORIES = ["breakfast", "lunch", "dinner", "snacks"]

export default function MenuItemForm({ itemId }: { itemId?: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState<MenuItem>({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    categories: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (itemId) {
      fetchMenuItem()
    }
  }, [itemId])

  const fetchMenuItem = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/${itemId}`)
      if (!response.ok) throw new Error("Failed to fetch item")
      const data = await response.json()
      setFormData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load item")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) : value,
    }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      if (!formData.title || !formData.description || !formData.price || !formData.imageUrl) {
        throw new Error("Please fill in all fields")
      }

      if (formData.categories.length === 0) {
        throw new Error("Please select at least one category")
      }

      const method = itemId ? "PUT" : "POST"
      const url = itemId ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/${itemId}` : `${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save item")

      setSuccess(itemId ? "Item updated successfully!" : "Item created successfully!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{itemId ? "Edit Item" : "Create New Item"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-900/20 border border-red-700 text-red-400 p-4 rounded-lg">{error}</div>}

          {success && (
            <div className="bg-green-900/20 border border-green-700 text-green-400 p-4 rounded-lg">{success}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Menu item title"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Item description"
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 rounded-md px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Price</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Image URL</label>
              <Input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Categories</label>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                  />
                  <span className="text-slate-300 capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Item"
              )}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
