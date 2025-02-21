import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface TableComponentProps {
  columns: any[];
  data: any[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  sortableColumns?: string[];
  filterableColumns?: string[];
  onRowClick?: (row: any) => void;
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
    columns,
    data,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 10,
    sortableColumns = [],
    filterableColumns = [],
    onRowClick,
    onSortChange
  }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string | null>(null);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
  
    useEffect(() => {
      if (onSortChange) {
        onSortChange(orderBy || '', order);
      }
    }, [orderBy, order, onSortChange]);
  
    const handleRequestSort = (property: string) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage); // Cambiar página
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10)); // Cambiar número de filas por página
      setPage(0); // Restablecer a la primera página
    };
  
    const handleFilterChange = (column: string, value: string) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [column]: value
      }));
    };
  
    const filteredData = data.filter((row) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        return row[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    });
  
    const sortedData = filteredData.sort((a, b) => {
      if (!orderBy) return 0;
  
      const aValue = a[orderBy];
      const bValue = b[orderBy];
  
      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={() => handleRequestSort(column.field)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                  {column.filterable && filterableColumns.includes(column.field) && (
                    <FormControl>
                      <InputLabel>Filter</InputLabel>
                      <Select
                        value={filters[column.field] || ''}
                        onChange={(e) => handleFilterChange(column.field, e.target.value)}
                      >
                        <MenuItem value="">All</MenuItem>
                        {column.filterValues?.map((value: string) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.checkbox ? (
                      <Checkbox checked={row[column.field]} />
                    ) : (
                      row[column.field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    );
  };
  
  export default TableComponent;