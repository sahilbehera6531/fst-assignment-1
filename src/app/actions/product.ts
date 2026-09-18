"use server"

import { productSchema } from "@/lib/schema"

export type ActionResponse = {
  success?: boolean
  message?: string
  errors?: Record<string, string[]>
}

export async function createProductAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  // Simulate network delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const rawData = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
  }

  // Server-side validation using Zod
  const validatedFields = productSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed on the server.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Here you would typically save to a database
  // e.g. await db.product.create({ data: validatedFields.data })

  return {
    success: true,
    message: `Product "${validatedFields.data.name}" created successfully!`,
  }
}
