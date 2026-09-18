import { ProductForm } from "@/components/product-form"
import { Cart } from "@/components/cart"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">TechStore</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Admin Portal</h2>
              <p className="text-muted-foreground mt-2">
                Manage your store inventory. New products added here will instantly appear in the cart to demonstrate state persistence.
              </p>
            </div>
            <ProductForm />
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Customer View</h2>
              <p className="text-muted-foreground mt-2">
                This cart state is managed by Zustand and persists across page reloads using localStorage.
              </p>
            </div>
            <Cart />
          </section>
        </div>
      </div>
      <Toaster />
    </main>
  )
}
