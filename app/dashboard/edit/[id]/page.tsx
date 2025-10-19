"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import MenuItemForm from "@/components/dashboard/menu-item-form"

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Edit Menu Item</h1>
          <p className="text-slate-400 mt-2">Update item details</p>
        </div>
        <MenuItemForm itemId={params.id} />
      </main>
    </div>
  )
}
