"use client"

import { useStore } from "@/hooks/useStore"
import { useCartStore } from "@/store/useCartStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function Cart() {
  const items = useStore(useCartStore, (state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  if (!items) {
    return (
      <Card className="w-full max-w-md h-64 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-4 w-32 bg-muted rounded"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </Card>
    )
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Shopping Cart</CardTitle>
          <Badge variant="secondary">{items.length} items</Badge>
        </div>
        <CardDescription>
          Review your items and proceed to checkout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="text-sm w-4 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4 pt-6">
        <div className="flex justify-between w-full">
          <span className="font-medium">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button className="w-full">Checkout</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
