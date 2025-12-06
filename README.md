# 📦 product.store — Simple Product Catalog (Nuxt + Vuetify)

A lightweight product listing app built for the recruitment task.
Users can browse products, search by text, and filter by category, manufacturer, and price range.

---

## 🚀 Features

- Full-text search (name, manufacturer, description)
- Filtering by category
- Filtering by manufacturer
- Filtering by price range (slider)
- Sorting by price (ascending / descending)
- Clear filters button
- Minimal and clean UI with sticky filters and fade transitions

---

## 🛠️ Tech Stack

- **Nuxt 4 / Vue 3**
- **Vuetify 3**
- **TypeScript**
- **CSV data imported as a static file**
- **Composables API (useFilters, useProducts)**

---

## 📂 Project Structure (overview)

```
app/components/
  cards/Product.vue – single product card
  filters/Sidebar.vue – filters panel (category, manufacturer, price)
  list/Products.vue – product grid listing
  ui/EmptyState.vue – empty state component shown when no results
app/composables/
  useProducts.ts – loads product data from products.csv
  useFilters.ts – filtering, searching and sorting logic
app/pages/index.vue – main product catalog page
app/plugins/vuetify.ts – Vuetify configuration (theme, icons, setup)
app/types/ – TypeScript types for products, filters and UI
public/products.csv – product dataset (provided CSV file)
```

---

## 📊 Data Source

The product list is loaded directly from a CSV file provided in the task.
No external API or database is used.

---

## 🤖 AI Assistance

AI tools were used only as a supportive coding assistant for minor improvements such as:
- refactoring suggestions,
- UI/CSS tips,
- and commit naming guidance.

All core logic and component implementation were written manually without auto-generated code.

---

## 📜 Scripts

### package.json

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  }
}
```

---

## How to run


Install dependencies:
```bash
npm install
```

Development server (http://localhost:3000):
```bash
npm run dev
```

Production build:
```bash
npm run build
```

Preview production build locally:
```bash
npm run preview
```

---

## 🧑‍💻 Author

Built as part of a frontend recruitment task.