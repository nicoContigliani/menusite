"use client"

import type React from "react"

import { Paper, Tabs, Tab } from "@mui/material"
import type { MenuItem, MenuCategory } from ".../../../types/menu-types"


interface CategoryTabsProps {
  categories: MenuCategory[]
  tabValue: number
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void
  isMobile: boolean
}

export default function CategoryTabs({ categories, tabValue, onTabChange, isMobile }: CategoryTabsProps) {
  // Ensure categories is an array and has items
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null
  }

  // Ensure tabValue is within bounds
  const safeTabValue = Math.min(Math.max(0, tabValue), categories.length - 1)

  return (
    <Paper elevation={2} sx={{ mb: 2 }}>
      <Tabs
        value={safeTabValue}
        onChange={onTabChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="primary"
        indicatorColor="primary"
      >
        {categories.map((category) => (
          <Tab key={category.key || Math.random().toString()} label={category.key || "Sin nombre"} />
        ))}
      </Tabs>
    </Paper>
  )
}

