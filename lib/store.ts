import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, BuilderItem, PackagingOption, Base, EnvelopeStyle } from './data'

// Cart Item type
export interface CartItem {
  id: string
  type: 'product' | 'custom' | 'premade'
  product?: Product
  customBuild?: {
    categorySlug: string
    subcategory: string
    items: Array<BuilderItem & { quantity: number }>
    packaging: PackagingOption
    message?: string
    uploadedPhoto?: string
  }
  quantity: number
  totalPrice: number
  name?: string
  components?: any[]
  image?: string
}

// Builder State
interface BuilderState {
  currentStep: number
  selectedBase: Base | null
  selectedComponents: Array<BuilderItem & { quantity: number }>
  selectedPackaging: PackagingOption | null
  message: string
  envelopeStyle: EnvelopeStyle | null
  uploadedPhoto: string | null
  
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  selectBase: (base: Base) => void
  addComponent: (component: BuilderItem) => void
  removeComponent: (componentId: string) => void
  updateComponentQuantity: (componentId: string, quantity: number) => void
  setPackaging: (packaging: PackagingOption) => void
  setMessage: (message: string) => void
  setEnvelopeStyle: (style: EnvelopeStyle | null) => void
  setUploadedPhoto: (photo: string | null) => void
  getTotalPrice: () => number
  reset: () => void
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  currentStep: 1,
  selectedBase: null,
  selectedComponents: [],
  selectedPackaging: null,
  message: '',
  envelopeStyle: null,
  uploadedPhoto: null,
  
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  selectBase: (base) => set({ 
    selectedBase: base
  }),
  
  addComponent: (component) => set((state) => {
    const existing = state.selectedComponents.find(c => c.id === component.id)
    if (existing) {
      return {
        selectedComponents: state.selectedComponents.map(c =>
          c.id === component.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
    }
    return {
      selectedComponents: [...state.selectedComponents, { ...component, quantity: 1 }]
    }
  }),
  
  removeComponent: (componentId) => set((state) => ({
    selectedComponents: state.selectedComponents.filter(c => c.id !== componentId)
  })),
  
  updateComponentQuantity: (componentId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { selectedComponents: state.selectedComponents.filter(c => c.id !== componentId) }
    }
    return {
      selectedComponents: state.selectedComponents.map(c =>
        c.id === componentId ? { ...c, quantity } : c
      )
    }
  }),
  
  setPackaging: (packaging) => set({ selectedPackaging: packaging }),
  setMessage: (message) => set({ message }),
  setEnvelopeStyle: (style) => set({ envelopeStyle: style }),
  setUploadedPhoto: (photo) => set({ uploadedPhoto: photo }),
  
  getTotalPrice: () => {
    const state = get()
    const basePrice = state.selectedBase?.price || 0
    const componentsPrice = state.selectedComponents.reduce(
      (total, component) => total + component.price * component.quantity, 0
    )
    const packagingPrice = state.selectedPackaging?.price || 0
    return basePrice + componentsPrice + packagingPrice
  },
  
  reset: () => set({
    currentStep: 1,
    selectedBase: null,
    selectedComponents: [],
    selectedPackaging: null,
    message: '',
    envelopeStyle: null,
    uploadedPhoto: null
  })
}))

// Cart Store
interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  addProduct: (product: Product, quantity?: number) => void
  addCustomBuild: (build: CartItem['customBuild'], totalPrice: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingIndex = state.items.findIndex(i => i.id === item.id)
        if (existingIndex > -1) {
          const newItems = [...state.items]
          newItems[existingIndex].quantity += item.quantity
          return { items: newItems }
        }
        return {
          items: [...state.items, item]
        }
      }),
      
      addProduct: (product, quantity = 1) => set((state) => {
        const existingIndex = state.items.findIndex(
          i => i.type === 'product' && i.product?.id === product.id
        )
        if (existingIndex > -1) {
          const newItems = [...state.items]
          newItems[existingIndex].quantity += quantity
          return { items: newItems }
        }
        return {
          items: [...state.items, {
            id: `product-${product.id}-${Date.now()}`,
            type: 'product',
            product,
            quantity,
            totalPrice: product.price
          }]
        }
      }),
      
      addCustomBuild: (build, totalPrice) => set((state) => ({
        items: [...state.items, {
          id: `custom-${Date.now()}`,
          type: 'custom',
          customBuild: build,
          quantity: 1,
          totalPrice
        }]
      })),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(i => i.id !== itemId)
      })),
      
      updateQuantity: (itemId, quantity) => set((state) => {
        if (quantity <= 0) {
          return { items: state.items.filter(i => i.id !== itemId) }
        }
        return {
          items: state.items.map(i =>
            i.id === itemId ? { ...i, quantity } : i
          )
        }
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      getTotalPrice: () => get().items.reduce(
        (total, item) => total + item.totalPrice * item.quantity, 0
      )
    }),
    { name: 'artful-cart' }
  )
)

// Wishlist Store
interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => set((state) => {
        if (state.items.some(i => i.id === product.id)) {
          return state
        }
        return { items: [...state.items, product] }
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.id !== productId)
      })),
      
      isInWishlist: (productId) => get().items.some(i => i.id === productId),
      
      clearWishlist: () => set({ items: [] })
    }),
    { name: 'artful-wishlist' }
  )
)

// Saved Designs Store
export interface SavedDesign {
  id: string
  name: string
  categorySlug: string
  subcategory: string
  items: Array<BuilderItem & { quantity: number }>
  packaging: PackagingOption
  message?: string
  uploadedPhoto?: string
  totalPrice: number
  createdAt: string
}

interface SavedDesignsState {
  designs: SavedDesign[]
  saveDesign: (design: Omit<SavedDesign, 'id' | 'createdAt'>) => void
  removeDesign: (designId: string) => void
}

export const useSavedDesignsStore = create<SavedDesignsState>()(
  persist(
    (set) => ({
      designs: [],
      
      saveDesign: (design) => set((state) => ({
        designs: [
          ...state.designs,
          {
            ...design,
            id: `design-${Date.now()}`,
            createdAt: new Date().toISOString()
          }
        ]
      })),
      
      removeDesign: (designId) => set((state) => ({
        designs: state.designs.filter(d => d.id !== designId)
      }))
    }),
    { name: 'artful-saved-designs' }
  )
)
