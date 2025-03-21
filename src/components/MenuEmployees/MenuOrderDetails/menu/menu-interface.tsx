"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, Container } from "@mui/material"
import { useMediaQuery } from "../../../../../hooks/use-mobile"
import type { MenuItem, MenuCategory, CartItem, MenuItemExtra } from "../../../../../types/menu-types"

// Components
import MenuHeader from "./menu-header"
import SearchBar from "./search-bar"
import CategoryTabs from "./category-tabs"
import MenuList from "./menu-list"
import ItemDetailsDialog from "./item-details-dialog"
import FilterDialog from "./filter-dialog"
import CartDrawer from "./cart-drawer"

export default function MenuInterface({ menuData = [] }: { menuData?: MenuCategory[] }) {
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<MenuCategory[]>(menuData)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [menuTitleFilter, setMenuTitleFilter] = useState<string[]>([])

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Update filteredData when menuData changes
  useEffect(() => {
    setFilteredData(menuData || [])
  }, [menuData])

  // Obtener todos los Menu_Title únicos para los filtros
  const getUniqueMenuTitles = () => {
    const titles = new Set<string>()
    if (!menuData || !Array.isArray(menuData)) return Array.from(titles)

    menuData.forEach((category) => {
      if (category && category.element && Array.isArray(category.element)) {
        category.element.forEach((item) => {
          if (item && item.Menu_Title) titles.add(item.Menu_Title)
        })
      }
    })
    return Array.from(titles)
  }

  const uniqueMenuTitles = getUniqueMenuTitles()

  // Filtrar datos basados en la búsqueda y filtros
  useEffect(() => {
    if (!menuData || !Array.isArray(menuData) || menuData.length === 0) {
      setFilteredData([])
      return
    }

    // Crear una copia segura de los datos
    let filtered = menuData.map((category) => ({
      ...category,
      element: Array.isArray(category.element) ? [...category.element] : [],
    }))

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered
        .map((category) => {
          if (!category.element || !Array.isArray(category.element)) {
            return { ...category, element: [] }
          }

          return {
            ...category,
            element: category.element.filter(
              (item) =>
                item &&
                ((item.Name && item.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (item.Description && item.Description.toLowerCase().includes(searchQuery.toLowerCase()))),
            ),
          }
        })
        .filter((category) => category.element && category.element.length > 0)
    }

    // Filtrar por Menu_Title si hay filtros activos
    if (menuTitleFilter.length > 0) {
      filtered = filtered
        .map((category) => {
          if (!category.element || !Array.isArray(category.element)) {
            return { ...category, element: [] }
          }

          return {
            ...category,
            element: category.element.filter(
              (item) => item && (!item.Menu_Title || menuTitleFilter.includes(item.Menu_Title)),
            ),
          }
        })
        .filter((category) => category.element && category.element.length > 0)
    }

    setFilteredData(filtered)

    // Si la categoría actual ya no tiene elementos, cambiar a la primera pestaña
    if (filtered.length > 0) {
      const isCurrentTabValid =
        tabValue < filtered.length &&
        filtered[tabValue] &&
        filtered[tabValue].element &&
        Array.isArray(filtered[tabValue].element) &&
        filtered[tabValue].element.length > 0

      if (!isCurrentTabValid) {
        setTabValue(0)
      }
    }
  }, [searchQuery, menuTitleFilter, tabValue, menuData])

  // Manejar cambio de pestaña
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Agregar item al carrito
  const addToCart = (item: MenuItem, extras: MenuItemExtra[] = []) => {
    if (!item) return

    const priceStr = item.Price || "$0"
    const price = Number.parseFloat(priceStr.replace("$", "")) || 0
    const extrasTotal = extras.reduce((sum, extra) => sum + (extra?.price || 0), 0)

    const newItem: CartItem = {
      id: Date.now().toString(),
      itemId: item.Item_id || "",
      name: item.Name || "",
      price: price,
      quantity: 1,
      extras: extras || [],
      extrasTotal: extrasTotal,
    }

    setCart([...cart, newItem])
    setDetailsOpen(false)
    setSelectedExtras([])
  }

  // Abrir diálogo de detalles
  const openDetails = (item: MenuItem) => {
    if (!item) return
    setSelectedItem(item)
    setSelectedExtras([])
    setDetailsOpen(true)
  }

  // Manejar selección de extras
  const handleExtraToggle = (extra: MenuItemExtra) => {
    if (!extra) return

    const currentIndex = selectedExtras.findIndex((e) => e && e.name === extra.name)
    const newExtras = [...selectedExtras]

    if (currentIndex === -1) {
      newExtras.push(extra)
    } else {
      newExtras.splice(currentIndex, 1)
    }

    setSelectedExtras(newExtras)
  }

  // Incrementar cantidad en el carrito
  const incrementQuantity = (id: string) => {
    if (!id) return
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  // Decrementar cantidad en el carrito
  const decrementQuantity = (id: string) => {
    if (!id) return
    setCart(
      cart
        .map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  // Eliminar item del carrito
  const removeFromCart = (id: string) => {
    if (!id) return
    setCart(cart.filter((item) => item.id !== id))
  }

  // Manejar filtros de Menu_Title
  const handleMenuTitleFilter = (title: string) => {
    if (!title) return

    if (menuTitleFilter.includes(title)) {
      setMenuTitleFilter(menuTitleFilter.filter((t) => t !== title))
    } else {
      setMenuTitleFilter([...menuTitleFilter, title])
    }
  }

  return (
    <Box sx={{ pb: 7 }}>
      {/* Barra superior */}
      <MenuHeader
        cartItemCount={cart.length}
        onCartOpen={() => setCartOpen(true)}
        onFilterOpen={() => setFilterOpen(true)}
      />

      {/* Contenido principal */}
      <Container maxWidth="md" sx={{ mt: 2 }}>
        {/* Buscador y filtros activos */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          menuTitleFilter={menuTitleFilter}
          onMenuTitleFilter={handleMenuTitleFilter}
          onClearFilters={() => setMenuTitleFilter([])}
        />

        {/* Pestañas de categorías */}
        <CategoryTabs categories={filteredData} tabValue={tabValue} onTabChange={handleTabChange} isMobile={isMobile} />

        {/* Lista de platos */}
        <MenuList
          categories={filteredData}
          tabValue={tabValue}
          onAddToCart={(item) => addToCart(item)}
          onOpenDetails={openDetails}
        />
      </Container>

      {/* Diálogo de detalles y extras */}
      <ItemDetailsDialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        selectedItem={selectedItem}
        selectedExtras={selectedExtras}
        onExtraToggle={handleExtraToggle}
        onAddToCart={addToCart}
      />

      {/* Diálogo de filtros */}
      <FilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        menuTitles={uniqueMenuTitles}
        selectedFilters={menuTitleFilter}
        onFilterChange={handleMenuTitleFilter}
        onClearFilters={() => setMenuTitleFilter([])}
      />

      {/* Drawer del carrito */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onIncrementItem={incrementQuantity}
        onDecrementItem={decrementQuantity}
      />
    </Box>
  )
}

