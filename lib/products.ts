export type Product = {
  id: string
  name: string
  tagline: string
  category: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: "aria",
    name: "Aria",
    tagline: "Sculptural, ergonomic, whisper-quiet.",
    category: "Massagers",
    price: 128,
    image: "/products/aria.png",
  },
  {
    id: "lume",
    name: "Lume",
    tagline: "Compact intensity, refined in crimson.",
    category: "Massagers",
    price: 96,
    image: "/products/lume.png",
  },
  {
    id: "sona",
    name: "Sona",
    tagline: "Soft to the touch, easy to hold.",
    category: "Wellness",
    price: 84,
    image: "/products/sona.png",
  },
  {
    id: "vela",
    name: "Vela",
    tagline: "Slender, elegant, beautifully precise.",
    category: "Wands",
    price: 142,
    image: "/products/vela.png",
  },
]
