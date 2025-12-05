import Papa from 'papaparse'
import type { Product } from '../types/product'

export const useProducts = () => {
  const products = ref<Product[]>([])

  const loadProducts = async () => {
    const response = await fetch('/products.csv')
    const csvText = await response.text()
    const parsed = Papa.parse<Product>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    })

    products.value = parsed.data
  }

  onMounted(loadProducts)

  return {
    products
  }
}