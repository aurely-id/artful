# Artful - Custom Gift Builder

A Next.js application for creating and customizing personalized gift boxes with a beautiful, interactive builder interface.

## Features

- **Home Page**: Landing page with hero section, feature highlights, and call-to-action
- **Custom Gift Builder**: 4-step wizard to create personalized gifts:
  1. Select Category (Gift Crate, Fashion, Accessories, Snacks, Souvenirs, Bundles)
  2. Add Items (Browse products by subcategory with quantity controls)
  3. Add Personal Message (Up to 500 characters)
  4. Review & Order (Preview all selections before checkout)
- **Shopping Cart**: View and manage cart items with quantity adjustments
- **Product Catalog**: 30+ products across 6 categories with detailed information

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: Radix UI primitives + custom components
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
/app
  /builder
    page.tsx          # Multi-step builder page
  /cart
    page.tsx          # Shopping cart page
  page.tsx            # Home page
  layout.tsx          # Root layout

/components
  /builder
    step-base.tsx        # Category selection
    step-components.tsx  # Product selection
    step-message.tsx     # Message input
    step-preview.tsx     # Review & checkout
  /ui
    button.tsx           # Button component
    magic-button.tsx     # Special magic button
    textarea.tsx         # Text area component
    label.tsx            # Label component
    tabs.tsx             # Tabs component
    scroll-area.tsx      # Scroll area component
    progress.tsx         # Progress bar
    separator.tsx        # Separator line

/lib
  store.ts            # Zustand stores (Builder, Cart, Wishlist)
  data.ts             # Product data, categories, utilities
  utils.ts            # Helper functions

/styles
  globals.css         # Global styles with Tailwind

/public
  /images             # Product and category images
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/pnpm/yarn/bun

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Run dev server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Features Breakdown

### Builder Flow
Users can create custom gifts through an intuitive 4-step process:
1. **Choose Category** - Select from 6 product categories
2. **Add Items** - Browse products by subcategory with quantity controls
3. **Add Message** - Write a personal message (0-500 characters)
4. **Review** - Preview complete order before adding to cart

### State Management
- **Builder Store**: Manages category selection, items, message, and totals
- **Cart Store**: Persists shopping cart with local storage
- **Wishlist Store**: Save favorite items for later

### Product Data
- 6 main categories with 2-5 subcategories each
- 30+ products with pricing, ratings, and descriptions
- Builder items for customization with granular pricing

## Styling & Theme

Custom Tailwind CSS theme with:
- Primary color: Violet (#7c3aed)
- Secondary color: Pink (#ec4899)
- Neutral color palette for backgrounds and text
- Serif font for headings (elegant feel)
- Sans-serif for body text

## Component Library

All UI components are built on Radix UI primitives with custom styling:
- Full keyboard navigation support
- Accessible color contrasts
- Smooth animations with Framer Motion
- Responsive design (mobile-first)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Image optimization with next/image
- Code splitting and lazy loading
- CSS-in-JS with Tailwind (atomic CSS)
- Zustand for minimal state management overhead

## Future Enhancements

- Integration with payment gateway (Stripe)
- User accounts and order history
- Product image uploads
- Email notifications
- Admin dashboard for inventory management

## License

MIT
