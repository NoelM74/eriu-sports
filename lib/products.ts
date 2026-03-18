export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  sizes: string[];
  badge: string | null;
  description: string;
  specs: string[];
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "premium-gaa-jersey",
    name: "Performance Home Jersey",
    category: "Jerseys",
    price: 65.00,
    images: ["/images/jersey-1.png"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Selling Fast",
    description:
      "Our flagship performance jersey. Engineered with Hexa-Cool™ technology for maximum breathability on the pitch. Featuring a modern athletic cut and reinforced stitching.",
    specs: [
      "Hexa-Cool™ breathable fabric",
      "Reinforced flatlock seams",
      "Moisture-wicking mesh zones",
      "Athletic compression fit",
    ],
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "performance-training-shorts",
    name: "Elite Training Shorts",
    category: "Apparel",
    price: 35.00,
    images: ["/images/shorts-1.png"],
    sizes: ["S", "M", "L", "XL"],
    badge: "New Arrival",
    description:
      "Lightweight, high-mobility training shorts designed for explosive movement. Features integrated zip pockets and a supportive inner liner.",
    specs: [
      "High-mobility stretch fabric",
      "Integrated secure zip pockets",
      "Elasticated waistband with drawcord",
      "Breathable inner liner",
    ],
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "gaa-football-pro",
    name: "Ériu Pro Match Ball",
    category: "Footballs",
    price: 45.00,
    images: ["/images/gaa-football.jpg"],
    sizes: ["Size 4", "Size 5"],
    badge: "Official Spec",
    description:
      "The ultimate match ball. Hand-stitched with premium synthetic leather for consistent flight and superior grip in all Irish weather conditions.",
    specs: [
      "Premium synthetic leather",
      "All-weather grip texture",
      "High-retention latex bladder",
      "Hand-stitched precision",
    ],
    rating: 5.0,
    reviewCount: 89,
  },
  {
    id: "grip-socks-elite",
    name: "Elite Grip Socks",
    category: "Accessories",
    price: 15.00,
    images: ["/images/grip-socks.jpg"],
    sizes: ["S", "M", "L"],
    badge: "Limited Edition",
    description:
      "Eliminate foot slide with our high-silicone grip technology. Designed specifically for the high-intensity lateral movements of Gaelic games.",
    specs: [
      "Anti-slip silicone pattern",
      "Compressive arch support",
      "Reinforced heel and toe",
      "Moisture-wicking yarn",
    ],
    rating: 4.9,
    reviewCount: 224,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export const categories = [
  "All",
  "Footballs",
  "Jerseys",
  "Socks",
  "Accessories",
];
