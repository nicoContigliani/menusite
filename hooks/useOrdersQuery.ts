import { useState, useMemo } from "react";

interface Order {
  _id: string;
  id: string;
  orderType: string;
  dataTypeOrder?: string;
  cart: Array<{
    id: string;
    itemId: number;
    name: string;
    price: number;
    quantity: number;
    extras?: Array<{
      name: string;
      price: number;
    }>;
    extrasTotal?: number;
    Description?: string;
  }>;
  comments?: string;
  companiesName: string;
  companiesID: string;
  email: string;
  fullname: string;
  phone: string;
  whathsapp?: string;
  channel?: string;
  name?: string;
  timestamp: string;
  status: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  version?: number;
  [key: string]: any;
}

interface Column {
  field: string;
  label: string;
  width: number;
  filterable: boolean;
  format?: (value: any) => string;
}

interface FilterMenu {
  anchorEl: null | HTMLElement;
  column: string | null;
}

interface Filters {
  email: string;
  status: string;
  orderType: string;
  phone: string;
  fullname: string;
  dateFrom: string;
  dateTo: string;
}

const useOrdersQuery = (companiesName: string) => {
  const [filters, setFilters] = useState<Filters>({
    email: "",
    status: "",
    orderType: "",
    phone: "",
    fullname: "",
    dateFrom: "",
    dateTo: "",
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [filterMenu, setFilterMenu] = useState<FilterMenu>({ 
    anchorEl: null, 
    column: null 
  });

  const columns: Column[] = [
    { field: "id", label: "ID Pedido", width: 150, filterable: true },
    { field: "orderType", label: "Tipo", width: 120, filterable: true },
    { field: "status", label: "Estado", width: 120, filterable: true },
    { field: "fullname", label: "Cliente", width: 180, filterable: true },
    { field: "email", label: "Email", width: 200, filterable: true },
    { field: "phone", label: "Teléfono", width: 150, filterable: true },
    {
      field: "createdAt",
      label: "Fecha Creación",
      width: 180,
      filterable: false,
      format: (value: string | Date) => {
        const date = new Date(value);
        return date.toLocaleString();
      }
    },
    {
      field: "cart",
      label: "Productos",
      width: 250,
      filterable: false,
      format: (cart: any[]) => {
        return cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
      }
    },
    { field: "comments", label: "Comentarios", width: 200, filterable: false },
  ];

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const processedResults = useMemo(() => {
    let filtered = [...results];

    // Apply general filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'dateFrom' && key !== 'dateTo') {
        filtered = filtered.filter((item) =>
          String(item[key] || "").toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply date range filters
    if (filters.dateFrom) {
      const filterDateFrom = new Date(filters.dateFrom);
      filterDateFrom.setHours(0, 0, 0, 0);

      filtered = filtered.filter((item) => {
        try {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= filterDateFrom;
        } catch (e) {
          console.error("Error processing date:", item.createdAt, e);
          return false;
        }
      });
    }

    if (filters.dateTo) {
      const filterDateTo = new Date(filters.dateTo);
      filterDateTo.setHours(23, 59, 59, 999);

      filtered = filtered.filter((item) => {
        try {
          const itemDate = new Date(item.createdAt);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate <= filterDateTo;
        } catch (e) {
          console.error("Error processing date:", item.createdAt, e);
          return false;
        }
      });
    }

    // Apply column filters
    Object.entries(columnFilters).forEach(([column, value]) => {
      if (value) {
        filtered = filtered.filter((item) =>
          String(item[column] || "").toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (orderBy === "createdAt" || orderBy === "updatedAt") {
        try {
          const dateA = new Date(aValue).getTime();
          const dateB = new Date(bValue).getTime();
          return order === "asc" ? dateA - dateB : dateB - dateA;
        } catch (e) {
          console.error("Error sorting by date:", e);
          return 0;
        }
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    return filtered;
  }, [results, filters, columnFilters, orderBy, order]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>, column: string) => {
    setFilterMenu({ anchorEl: event.currentTarget, column });
  };

  const closeFilterMenu = () => {
    setFilterMenu({ anchorEl: null, column: null });
  };

  const applyColumnFilter = (value: string) => {
    if (filterMenu.column) {
      setColumnFilters({
        ...columnFilters,
        [filterMenu.column]: value,
      });
      closeFilterMenu();
    }
  };

  const clearColumnFilter = (column: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[column];
    setColumnFilters(newFilters);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ordersquery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filters, companiesName }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
        setPage(0);
      } else {
        setError(data.message || "Query error.");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    filters,
    loading,
    results,
    error,
    orderBy,
    order,
    page,
    rowsPerPage,
    columnFilters,
    filterMenu,
    columns,
    processedResults,
    
    // Handlers
    setFilters,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    openFilterMenu,
    closeFilterMenu,
    applyColumnFilter,
    clearColumnFilter,
    handleSubmit,
  };
};

export default useOrdersQuery;