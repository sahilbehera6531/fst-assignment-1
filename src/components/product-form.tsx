"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { productSchema, ProductFormValues } from "@/lib/schema"
import { createProductAction } from "@/app/actions/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from "@/store/useCartStore"

export function ProductForm() {
  const [isPending, startTransition] = useTransition()
  const addItem = useCartStore((state) => state.addItem)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  })

  const onSubmit = (data: ProductFormValues) => {
    startTransition(async () => {
      // Optimistically add to local store if desired, or just wait for server
      // To simulate optimistic UI, we might dispatch to a toast immediately.
      toast.info("Submitting product...")

      // We use FormData for Server Actions compatibility
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("price", data.price.toString())
      formData.append("description", data.description)

      const result = await createProductAction(null, formData)

      if (result.success) {
        toast.success(result.message)
        // Add item to cart store as a side effect
        addItem({
          id: Math.random().toString(36).substring(7),
          name: data.name,
          price: data.price,
          quantity: 1,
        })
        reset()
      } else {
        toast.error(result.message || "Something went wrong.")
        if (result.errors) {
          // You could dynamically map these back to form errors using `setError`
          console.error(result.errors)
        }
      }
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Submit a new product to be added to your inventory.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="E.g., Wireless Mouse"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price")}
              aria-invalid={!!errors.price}
            />
            {errors.price && (
              <p className="text-sm text-destructive" role="alert">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief details about the product"
              {...register("description")}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm text-destructive" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Add Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
