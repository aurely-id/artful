// ArtFul Ollivianders - Complete Product Data

// Categories
export interface Category {
  id: number
  slug: string
  name: string
  icon: string
  count: number
  description: string
  image: string
}

export const categories: Category[] = [
  { 
    id: 1, 
    slug: "gift-crate", 
    name: "Gift Crate", 
    icon: "Gift",
    count: 24,
    description: "Buket, Frame, dan Hampers untuk momen spesial",
    image: "/images/categories/gift-crate.jpg"
  },
  { 
    id: 2, 
    slug: "fashion-item", 
    name: "Fashion Item", 
    icon: "Shirt",
    count: 18,
    description: "Blazer Brokat, Obi Belt, dan Kerah elegan",
    image: "/images/categories/fashion-item.jpg"
  },
  { 
    id: 3, 
    slug: "accessory-fashion", 
    name: "Accessory Fashion", 
    icon: "Briefcase",
    count: 32,
    description: "Tas, Dompet, dan Ganci custom",
    image: "/images/categories/accessory.jpg"
  },
  { 
    id: 4, 
    slug: "cooking-snack", 
    name: "Cooking Snack", 
    icon: "Cookie",
    count: 15,
    description: "Brownies, Kentang Musthota, dan Abon Gulung",
    image: "/images/categories/snack.jpg"
  },
  { 
    id: 5, 
    slug: "souvenir", 
    name: "Souvenir", 
    icon: "PartyPopper",
    count: 28,
    description: "Souvenir untuk berbagai acara spesial",
    image: "/images/categories/souvenir.jpg"
  },
  { 
    id: 6, 
    slug: "bundling-combo", 
    name: "Bundling Combo", 
    icon: "Sparkles",
    count: 12,
    description: "Paket hemat untuk daily use",
    image: "/images/categories/bundling.jpg"
  }
]

// Subcategories per category
export const subcategories: Record<string, string[]> = {
  "gift-crate": ["Buket", "Frame", "Hampers/Hantaran"],
  "fashion-item": ["Blazer Brokat", "Obi Belt", "Kerah"],
  "accessory-fashion": ["Tas Tote Bag", "Tas Slempang", "Tas Laptop", "Dompet", "Ganci"],
  "cooking-snack": ["Brownies Kukus", "Fudgy Brownies Biter", "Kentang Musthota", "Abon Gulung"],
  "souvenir": ["Pernikahan", "Ulang Tahun", "Graduation", "Corporate"],
  "bundling-combo": ["Self Care Combo", "Fashionista Combo", "Snack Lovers Combo", "Gift Set Complete"]
}

// Product interface
export interface Product {
  id: number
  name: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  description: string
  rating: number
  reviews: number
  isBestSeller?: boolean
  isNew?: boolean
  inStock: boolean
  tags: string[]
  variants?: { name: string; options: string[] }[]
}

// Complete product list (30+ products)
export const products: Product[] = [
  // GIFT CRATE - Buket
  { 
    id: 1, 
    name: "Buket Bunga Kering Lavender", 
    category: "gift-crate", 
    subcategory: "Buket", 
    price: 89000, 
    image: "/images/products/buket-lavender.jpg",
    images: ["/images/products/buket-lavender.jpg"],
    description: "Buket cantik dengan bunga kering lavender yang tahan lama dan harum",
    rating: 4.8, 
    reviews: 128,
    isBestSeller: true,
    inStock: true,
    tags: ["romantic", "birthday", "anniversary"]
  },
  { 
    id: 2, 
    name: "Buket Snack Maksima", 
    category: "gift-crate", 
    subcategory: "Buket", 
    price: 125000, 
    image: "/images/products/buket-snack.jpg",
    images: ["/images/products/buket-snack.jpg"],
    description: "Buket berisi snack favorit pilihan dengan packaging premium",
    rating: 4.9, 
    reviews: 89,
    isBestSeller: true,
    inStock: true,
    tags: ["birthday", "congratulations"]
  },
  { 
    id: 3, 
    name: "Buket Uang Custom", 
    category: "gift-crate", 
    subcategory: "Buket", 
    price: 150000, 
    originalPrice: 180000,
    image: "/images/products/buket-uang.jpg",
    images: ["/images/products/buket-uang.jpg"],
    description: "Buket uang dengan desain kreatif, cocok untuk graduation",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    tags: ["graduation", "birthday"]
  },
  { 
    id: 4, 
    name: "Buket Boneka Mini", 
    category: "gift-crate", 
    subcategory: "Buket", 
    price: 175000, 
    image: "/images/products/buket-boneka.jpg",
    images: ["/images/products/buket-boneka.jpg"],
    description: "Buket dengan boneka mini yang lucu dan menggemaskan",
    rating: 4.6,
    reviews: 45,
    isNew: true,
    inStock: true,
    tags: ["birthday", "romantic"]
  },
  
  // GIFT CRATE - Frame
  { 
    id: 5, 
    name: "Frame Foto Custom", 
    category: "gift-crate", 
    subcategory: "Frame", 
    price: 95000, 
    image: "/images/products/frame-foto.jpg",
    images: ["/images/products/frame-foto.jpg"],
    description: "Frame foto dengan desain custom sesuai permintaan",
    rating: 4.8,
    reviews: 156,
    isBestSeller: true,
    inStock: true,
    tags: ["anniversary", "memory"]
  },
  { 
    id: 6, 
    name: "Frame Quote Motivasi", 
    category: "gift-crate", 
    subcategory: "Frame", 
    price: 85000, 
    image: "/images/products/frame-quote.jpg",
    images: ["/images/products/frame-quote.jpg"],
    description: "Frame dengan quote inspiratif pilihan atau custom",
    rating: 4.5,
    reviews: 34,
    inStock: true,
    tags: ["motivation", "gift"]
  },
  { 
    id: 7, 
    name: "Frame Bunga Kering", 
    category: "gift-crate", 
    subcategory: "Frame", 
    price: 120000, 
    image: "/images/products/frame-bunga.jpg",
    images: ["/images/products/frame-bunga.jpg"],
    description: "Frame dengan hiasan bunga kering yang cantik dan elegan",
    rating: 4.9,
    reviews: 78,
    inStock: true,
    tags: ["romantic", "decoration"]
  },
  
  // GIFT CRATE - Hampers
  { 
    id: 8, 
    name: "Hampers Lamaran Premium", 
    category: "gift-crate", 
    subcategory: "Hampers/Hantaran", 
    price: 850000, 
    originalPrice: 1000000,
    image: "/images/products/hampers-lamaran.jpg",
    images: ["/images/products/hampers-lamaran.jpg"],
    description: "Set lengkap hampers lamaran dengan packaging mewah",
    rating: 5.0,
    reviews: 23,
    isBestSeller: true,
    inStock: true,
    tags: ["wedding", "premium"]
  },
  { 
    id: 9, 
    name: "Hampers Baby Shower", 
    category: "gift-crate", 
    subcategory: "Hampers/Hantaran", 
    price: 450000, 
    image: "/images/products/hampers-baby.jpg",
    images: ["/images/products/hampers-baby.jpg"],
    description: "Hampers lucu untuk menyambut kelahiran buah hati",
    rating: 4.8,
    reviews: 45,
    inStock: true,
    tags: ["baby", "celebration"]
  },
  
  // FASHION ITEM - Blazer Brokat
  { 
    id: 10, 
    name: "Blazer Brokat Premium", 
    category: "fashion-item", 
    subcategory: "Blazer Brokat", 
    price: 350000, 
    image: "/images/products/blazer-premium.jpg",
    images: ["/images/products/blazer-premium.jpg"],
    description: "Blazer brokat dengan detail mewah untuk acara formal",
    rating: 4.9,
    reviews: 67,
    isBestSeller: true,
    inStock: true,
    tags: ["formal", "elegant"],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL"] }]
  },
  { 
    id: 11, 
    name: "Blazer Brokat Casual", 
    category: "fashion-item", 
    subcategory: "Blazer Brokat", 
    price: 275000, 
    image: "/images/products/blazer-casual.jpg",
    images: ["/images/products/blazer-casual.jpg"],
    description: "Blazer brokat dengan desain casual untuk daily wear",
    rating: 4.6,
    reviews: 34,
    inStock: true,
    tags: ["casual", "daily"],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL"] }]
  },
  { 
    id: 12, 
    name: "Set Blazer + Rok Brokat", 
    category: "fashion-item", 
    subcategory: "Blazer Brokat", 
    price: 550000, 
    originalPrice: 650000,
    image: "/images/products/set-blazer-rok.jpg",
    images: ["/images/products/set-blazer-rok.jpg"],
    description: "Set lengkap blazer dan rok brokat matching",
    rating: 4.8,
    reviews: 89,
    isNew: true,
    inStock: true,
    tags: ["formal", "set"],
    variants: [{ name: "Ukuran", options: ["S", "M", "L", "XL"] }]
  },
  
  // FASHION ITEM - Obi Belt
  { 
    id: 13, 
    name: "Obi Belt Polos Elegant", 
    category: "fashion-item", 
    subcategory: "Obi Belt", 
    price: 85000, 
    image: "/images/products/obi-polos.jpg",
    images: ["/images/products/obi-polos.jpg"],
    description: "Obi belt polos dengan bahan premium dan jahitan rapi",
    rating: 4.7,
    reviews: 123,
    isBestSeller: true,
    inStock: true,
    tags: ["accessory", "elegant"]
  },
  { 
    id: 14, 
    name: "Obi Belt Brokat", 
    category: "fashion-item", 
    subcategory: "Obi Belt", 
    price: 125000, 
    image: "/images/products/obi-brokat.jpg",
    images: ["/images/products/obi-brokat.jpg"],
    description: "Obi belt dengan detail brokat cantik",
    rating: 4.8,
    reviews: 56,
    inStock: true,
    tags: ["formal", "brokat"]
  },
  { 
    id: 15, 
    name: "Obi Belt Pita", 
    category: "fashion-item", 
    subcategory: "Obi Belt", 
    price: 95000, 
    image: "/images/products/obi-pita.jpg",
    images: ["/images/products/obi-pita.jpg"],
    description: "Obi belt dengan aksen pita yang feminin",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    tags: ["feminine", "cute"]
  },
  
  // FASHION ITEM - Kerah
  { 
    id: 16, 
    name: "Kerah Removable Renda", 
    category: "fashion-item", 
    subcategory: "Kerah", 
    price: 65000, 
    image: "/images/products/kerah-renda.jpg",
    images: ["/images/products/kerah-renda.jpg"],
    description: "Kerah lepas pasang dengan detail renda cantik",
    rating: 4.6,
    reviews: 45,
    inStock: true,
    tags: ["accessory", "vintage"]
  },
  { 
    id: 17, 
    name: "Kerah Brokat Premium", 
    category: "fashion-item", 
    subcategory: "Kerah", 
    price: 95000, 
    image: "/images/products/kerah-brokat.jpg",
    images: ["/images/products/kerah-brokat.jpg"],
    description: "Kerah brokat mewah untuk acara formal",
    rating: 4.8,
    reviews: 34,
    isNew: true,
    inStock: true,
    tags: ["formal", "brokat"]
  },
  
  // ACCESSORY FASHION - Tas
  { 
    id: 18, 
    name: "Tote Bag Canvas Custom", 
    category: "accessory-fashion", 
    subcategory: "Tas Tote Bag", 
    price: 85000, 
    image: "/images/products/tote-canvas.jpg",
    images: ["/images/products/tote-canvas.jpg"],
    description: "Tote bag canvas dengan custom nama atau quote",
    rating: 4.9,
    reviews: 234,
    isBestSeller: true,
    inStock: true,
    tags: ["daily", "custom"]
  },
  { 
    id: 19, 
    name: "Tote Bag Brokat", 
    category: "accessory-fashion", 
    subcategory: "Tas Tote Bag", 
    price: 150000, 
    image: "/images/products/tote-brokat.jpg",
    images: ["/images/products/tote-brokat.jpg"],
    description: "Tote bag dengan detail brokat elegan",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    tags: ["elegant", "formal"]
  },
  { 
    id: 20, 
    name: "Tas Slempang Minimalis", 
    category: "accessory-fashion", 
    subcategory: "Tas Slempang", 
    price: 125000, 
    image: "/images/products/slempang-mini.jpg",
    images: ["/images/products/slempang-mini.jpg"],
    description: "Tas slempang dengan desain minimalis dan praktis",
    rating: 4.8,
    reviews: 156,
    isBestSeller: true,
    inStock: true,
    tags: ["daily", "minimalist"]
  },
  { 
    id: 21, 
    name: "Tas Laptop 15 inch", 
    category: "accessory-fashion", 
    subcategory: "Tas Laptop", 
    price: 175000, 
    image: "/images/products/tas-laptop.jpg",
    images: ["/images/products/tas-laptop.jpg"],
    description: "Tas laptop dengan padding empuk dan desain stylish",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    tags: ["work", "practical"]
  },
  { 
    id: 22, 
    name: "Dompet Mini Quilling", 
    category: "accessory-fashion", 
    subcategory: "Dompet", 
    price: 95000, 
    image: "/images/products/dompet-mini.jpg",
    images: ["/images/products/dompet-mini.jpg"],
    description: "Dompet mini dengan hiasan quilling handmade",
    rating: 4.9,
    reviews: 178,
    isBestSeller: true,
    inStock: true,
    tags: ["handmade", "cute"]
  },
  { 
    id: 23, 
    name: "Ganci Akrilik Custom", 
    category: "accessory-fashion", 
    subcategory: "Ganci", 
    price: 35000, 
    image: "/images/products/ganci-akrilik.jpg",
    images: ["/images/products/ganci-akrilik.jpg"],
    description: "Gantungan kunci akrilik dengan desain custom",
    rating: 4.7,
    reviews: 345,
    isBestSeller: true,
    inStock: true,
    tags: ["custom", "souvenir"]
  },
  { 
    id: 24, 
    name: "Ganci Resin Bunga", 
    category: "accessory-fashion", 
    subcategory: "Ganci", 
    price: 55000, 
    image: "/images/products/ganci-resin.jpg",
    images: ["/images/products/ganci-resin.jpg"],
    description: "Gantungan kunci resin dengan bunga asli di dalamnya",
    rating: 4.8,
    reviews: 123,
    isNew: true,
    inStock: true,
    tags: ["handmade", "unique"]
  },
  
  // COOKING SNACK
  { 
    id: 25, 
    name: "Brownies Kukus Original", 
    category: "cooking-snack", 
    subcategory: "Brownies Kukus", 
    price: 45000, 
    image: "/images/products/brownies-original.jpg",
    images: ["/images/products/brownies-original.jpg"],
    description: "Brownies kukus lembut dengan rasa coklat premium",
    rating: 4.9,
    reviews: 567,
    isBestSeller: true,
    inStock: true,
    tags: ["snack", "chocolate"]
  },
  { 
    id: 26, 
    name: "Brownies Kukus Keju", 
    category: "cooking-snack", 
    subcategory: "Brownies Kukus", 
    price: 55000, 
    image: "/images/products/brownies-keju.jpg",
    images: ["/images/products/brownies-keju.jpg"],
    description: "Brownies kukus dengan topping keju melimpah",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    tags: ["snack", "cheese"]
  },
  { 
    id: 27, 
    name: "Fudgy Brownies Bites", 
    category: "cooking-snack", 
    subcategory: "Fudgy Brownies Biter", 
    price: 65000, 
    image: "/images/products/fudgy-bites.jpg",
    images: ["/images/products/fudgy-bites.jpg"],
    description: "Fudgy brownies dalam bentuk bites yang praktis",
    rating: 4.9,
    reviews: 189,
    isBestSeller: true,
    inStock: true,
    tags: ["snack", "premium"]
  },
  { 
    id: 28, 
    name: "Kentang Musthota Original", 
    category: "cooking-snack", 
    subcategory: "Kentang Musthota", 
    price: 35000, 
    image: "/images/products/kentang-original.jpg",
    images: ["/images/products/kentang-original.jpg"],
    description: "Kentang musthota crispy dengan bumbu original",
    rating: 4.7,
    reviews: 456,
    isBestSeller: true,
    inStock: true,
    tags: ["snack", "crispy"]
  },
  { 
    id: 29, 
    name: "Abon Gulung Ayam", 
    category: "cooking-snack", 
    subcategory: "Abon Gulung", 
    price: 40000, 
    image: "/images/products/abon-ayam.jpg",
    images: ["/images/products/abon-ayam.jpg"],
    description: "Abon gulung ayam renyah dan gurih",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    tags: ["snack", "savory"]
  },
  
  // SOUVENIR
  { 
    id: 30, 
    name: "Souvenir Pernikahan Set", 
    category: "souvenir", 
    subcategory: "Pernikahan", 
    price: 15000, 
    image: "/images/products/souvenir-nikah.jpg",
    images: ["/images/products/souvenir-nikah.jpg"],
    description: "Set souvenir pernikahan elegan (minimal order 50pcs)",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    tags: ["wedding", "bulk"]
  },
  { 
    id: 31, 
    name: "Souvenir Graduation Pin", 
    category: "souvenir", 
    subcategory: "Graduation", 
    price: 25000, 
    image: "/images/products/souvenir-graduation.jpg",
    images: ["/images/products/souvenir-graduation.jpg"],
    description: "Pin graduation custom dengan nama dan tahun",
    rating: 4.7,
    reviews: 156,
    isBestSeller: true,
    inStock: true,
    tags: ["graduation", "custom"]
  },
  { 
    id: 32, 
    name: "Souvenir Corporate Tumbler", 
    category: "souvenir", 
    subcategory: "Corporate", 
    price: 45000, 
    image: "/images/products/souvenir-tumbler.jpg",
    images: ["/images/products/souvenir-tumbler.jpg"],
    description: "Tumbler dengan logo perusahaan (minimal 30pcs)",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    tags: ["corporate", "bulk"]
  },
  
  // BUNDLING COMBO
  { 
    id: 33, 
    name: "Self Care Combo", 
    category: "bundling-combo", 
    subcategory: "Self Care Combo", 
    price: 275000, 
    originalPrice: 350000,
    image: "/images/products/combo-selfcare.jpg",
    images: ["/images/products/combo-selfcare.jpg"],
    description: "Paket lengkap: Tote bag + Dompet + Ganci",
    rating: 4.9,
    reviews: 234,
    isBestSeller: true,
    inStock: true,
    tags: ["bundle", "value"]
  },
  { 
    id: 34, 
    name: "Fashionista Combo", 
    category: "bundling-combo", 
    subcategory: "Fashionista Combo", 
    price: 450000, 
    originalPrice: 550000,
    image: "/images/products/combo-fashionista.jpg",
    images: ["/images/products/combo-fashionista.jpg"],
    description: "Paket lengkap: Blazer + Obi Belt + Kerah",
    rating: 4.8,
    reviews: 156,
    isNew: true,
    inStock: true,
    tags: ["bundle", "fashion"]
  },
  { 
    id: 35, 
    name: "Snack Lovers Combo", 
    category: "bundling-combo", 
    subcategory: "Snack Lovers Combo", 
    price: 150000, 
    originalPrice: 185000,
    image: "/images/products/combo-snack.jpg",
    images: ["/images/products/combo-snack.jpg"],
    description: "Paket lengkap: Brownies + Kentang + Abon Gulung",
    rating: 4.9,
    reviews: 345,
    isBestSeller: true,
    inStock: true,
    tags: ["bundle", "snack"]
  },
  { 
    id: 36, 
    name: "Gift Set Complete", 
    category: "bundling-combo", 
    subcategory: "Gift Set Complete", 
    price: 350000, 
    originalPrice: 420000,
    image: "/images/products/combo-giftset.jpg",
    images: ["/images/products/combo-giftset.jpg"],
    description: "Paket lengkap: Buket Mini + Frame + Souvenir",
    rating: 5.0,
    reviews: 89,
    isBestSeller: true,
    inStock: true,
    tags: ["bundle", "gift", "premium"]
  }
]

// Stories / Testimonials
export interface Story {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  authorImage: string
  date: string
  tags: string[]
}

export const stories: Story[] = [
  {
    id: 'story-1',
    title: 'Hampers Lamaran yang Bikin Mertua Terpukau',
    excerpt: 'Saat memilih hampers untuk lamaran, aku ingin sesuatu yang spesial dan bermakna...',
    content: 'Cerita lengkap tentang pemilihan hampers lamaran premium...',
    image: '/images/stories/story-lamaran.jpg',
    author: 'Anisa R.',
    authorImage: '/images/authors/anisa.jpg',
    date: '2024-03-15',
    tags: ['wedding', 'lamaran']
  },
  {
    id: 'story-2',
    title: 'Buket Graduation yang Viral di Kampus',
    excerpt: 'Buket uang custom dari ArtFul jadi pusat perhatian saat wisuda adikku...',
    content: 'Cerita lengkap tentang buket graduation...',
    image: '/images/stories/story-graduation.jpg',
    author: 'Budi K.',
    authorImage: '/images/authors/budi.jpg',
    date: '2024-03-10',
    tags: ['graduation', 'custom']
  },
  {
    id: 'story-3',
    title: 'Snack Box untuk Tim Kantor yang Bikin Semangat',
    excerpt: 'Sebagai HR, aku sering cari gift untuk tim. Combo snack dari ArtFul selalu jadi favorit...',
    content: 'Cerita lengkap tentang corporate gifting...',
    image: '/images/stories/story-corporate.jpg',
    author: 'Maya S.',
    authorImage: '/images/authors/maya.jpg',
    date: '2024-03-05',
    tags: ['corporate', 'snack']
  },
  {
    id: 'story-4',
    title: 'Frame Foto Anniversary yang Bikin Nangis',
    excerpt: 'Hadiah anniversary ke-5 tahun pernikahan kami, frame custom dengan foto-foto kenangan...',
    content: 'Cerita lengkap tentang hadiah anniversary...',
    image: '/images/stories/story-anniversary.jpg',
    author: 'Dewi L.',
    authorImage: '/images/authors/dewi.jpg',
    date: '2024-02-28',
    tags: ['anniversary', 'romantic']
  }
]

// Builder Components for Custom Builder
export interface BuilderItem {
  id: string
  name: string
  category: string
  subcategory: string
  price: number
  image: string
  description: string
}

// Items available for custom builder
export const builderItems: BuilderItem[] = [
  // Buket components
  { id: 'b1', name: 'Bunga Kering Lavender', category: 'gift-crate', subcategory: 'Buket', price: 25000, image: '/images/builder/lavender.jpg', description: 'Setangkai bunga kering lavender' },
  { id: 'b2', name: 'Bunga Kering Rose', category: 'gift-crate', subcategory: 'Buket', price: 30000, image: '/images/builder/rose.jpg', description: 'Setangkai bunga kering rose' },
  { id: 'b3', name: 'Baby Breath', category: 'gift-crate', subcategory: 'Buket', price: 15000, image: '/images/builder/baby-breath.jpg', description: 'Hiasan baby breath' },
  { id: 'b4', name: 'Eucalyptus', category: 'gift-crate', subcategory: 'Buket', price: 20000, image: '/images/builder/eucalyptus.jpg', description: 'Daun eucalyptus dekoratif' },
  { id: 'b5', name: 'Snack Coklat', category: 'gift-crate', subcategory: 'Buket', price: 35000, image: '/images/builder/chocolate.jpg', description: 'Coklat premium untuk buket' },
  { id: 'b6', name: 'Snack Chips', category: 'gift-crate', subcategory: 'Buket', price: 25000, image: '/images/builder/chips.jpg', description: 'Snack chips untuk buket' },
  { id: 'b7', name: 'Boneka Mini', category: 'gift-crate', subcategory: 'Buket', price: 45000, image: '/images/builder/teddy.jpg', description: 'Boneka mini lucu' },
  { id: 'b8', name: 'Uang Lipatan', category: 'gift-crate', subcategory: 'Buket', price: 0, image: '/images/builder/money.jpg', description: 'Tempat uang lipatan (uang tidak termasuk)' },
  
  // Frame components
  { id: 'f1', name: 'Frame Kayu 4R', category: 'gift-crate', subcategory: 'Frame', price: 45000, image: '/images/builder/frame-4r.jpg', description: 'Frame kayu ukuran 4R' },
  { id: 'f2', name: 'Frame Kayu 5R', category: 'gift-crate', subcategory: 'Frame', price: 55000, image: '/images/builder/frame-5r.jpg', description: 'Frame kayu ukuran 5R' },
  { id: 'f3', name: 'Cetak Foto', category: 'gift-crate', subcategory: 'Frame', price: 15000, image: '/images/builder/print.jpg', description: 'Cetak foto berkualitas' },
  { id: 'f4', name: 'Hiasan Bunga Kering', category: 'gift-crate', subcategory: 'Frame', price: 25000, image: '/images/builder/dried-deco.jpg', description: 'Hiasan bunga kering untuk frame' },
  
  // Fashion items for customization
  { id: 'fa1', name: 'Kain Brokat Premium', category: 'fashion-item', subcategory: 'Blazer Brokat', price: 150000, image: '/images/builder/brokat.jpg', description: 'Bahan brokat premium' },
  { id: 'fa2', name: 'Bordir Custom', category: 'fashion-item', subcategory: 'Blazer Brokat', price: 50000, image: '/images/builder/bordir.jpg', description: 'Tambahan bordir custom' },
  
  // Snack items
  { id: 's1', name: 'Brownies Kukus 1 Loyang', category: 'cooking-snack', subcategory: 'Brownies Kukus', price: 45000, image: '/images/builder/brownies.jpg', description: 'Brownies kukus homemade' },
  { id: 's2', name: 'Kentang Musthota 250gr', category: 'cooking-snack', subcategory: 'Kentang Musthota', price: 35000, image: '/images/builder/kentang.jpg', description: 'Kentang musthota crispy' },
  { id: 's3', name: 'Abon Gulung 200gr', category: 'cooking-snack', subcategory: 'Abon Gulung', price: 40000, image: '/images/builder/abon.jpg', description: 'Abon gulung renyah' }
]

// Packaging options for builder
export interface PackagingOption {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export const packagingOptions: PackagingOption[] = [
  { id: 'pkg-1', name: 'Standard Gift Box', price: 25000, image: '/images/packaging/standard.jpg', description: 'Box standar dengan pita' },
  { id: 'pkg-2', name: 'Premium Box', price: 50000, image: '/images/packaging/premium.jpg', description: 'Box premium dengan velvet lining' },
  { id: 'pkg-3', name: 'Hampers Basket', price: 75000, image: '/images/packaging/hampers.jpg', description: 'Keranjang hampers dengan handle' }
]

// Helper functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category === categorySlug)
}

export function getProductsBySubcategory(categorySlug: string, subcategory: string): Product[] {
  return products.filter(p => p.category === categorySlug && p.subcategory === subcategory)
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller).slice(0, 6)
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.isNew)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowerQuery))
  )
}

export function getBuilderItemsByCategory(categorySlug: string): BuilderItem[] {
  return builderItems.filter(item => item.category === categorySlug)
}

export function getBuilderItemsBySubcategory(subcategory: string): BuilderItem[] {
  return builderItems.filter(item => item.subcategory === subcategory)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === Number(id))
}
