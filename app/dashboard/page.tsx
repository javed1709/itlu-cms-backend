"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import MenuItemsList from "@/components/dashboard/menu-items-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Menu Items</h1>
            <p className="text-slate-400 mt-2">Manage your restaurant menu</p>
          </div>
          <Link href="/dashboard/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Add New Item</Button>
          </Link>
        </div>
        <MenuItemsList />
      </main>
    </div>
  )
}
