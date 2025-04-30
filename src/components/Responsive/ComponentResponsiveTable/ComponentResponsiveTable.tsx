import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  Tooltip,
  Box,
  TableSortLabel,
  Checkbox,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  editable?: boolean;
  type?: 'text' | 'number' | 'boolean';
}

interface EditableTableProps<T> {
  columns: Column[];
  data: T[];
  onEdit: (id: string, field: string, value: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onSelect?: (selected: string[]) => void;
  initialRowsPerPage?: number;
  sortable?: boolean;
  selectable?: boolean;
}

const ComponentResponsiveTable = <T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onSelect,
  initialRowsPerPage = 5,
  sortable = false,
  selectable = false,
}: EditableTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<T>>({});
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row: T) => {
    setEditId(row.id);
    setEditData({ ...row });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleSaveEdit = async () => {
    if (!editId) return;

    for (const [field, value] of Object.entries(editData)) {
      if (JSON.stringify(value) !== JSON.stringify(data.find(item => item.id === editId)?.[field as keyof T])) {
        await onEdit(editId, field, value);
      }
    }
    
    setEditId(null);
    setEditData({});
  };

  const handleChangeEdit = (field: string, value: any) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      onSelect?.(newSelected);
      return;
    }
    setSelected([]);
    onSelect?.([]);
  };

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!orderBy) return 0;
    
    const aValue = a[orderBy as keyof T];
    const bValue = b[orderBy as keyof T];
    
    if (aValue === bValue) return 0;
    
    if (order === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => {
              const isSelected = selected.includes(row.id);
              const isEditing = editId === row.id;

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected}
                        onChange={() => handleSelect(row.id)}
                      />
                    </TableCell>
                  )}
                  
                  {columns.map((column) => {
                    const value = isEditing ? editData[column.id as keyof T] : row[column.id as keyof T];
                    const columnType = column.type || 'text';

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {isEditing && column.editable !== false ? (
                          columnType === 'boolean' ? (
                            <Checkbox
                              checked={Boolean(value)}
                              onChange={(e) => handleChangeEdit(column.id, e.target.checked)}
                            />
                          ) : (
                            <TextField
                              type={columnType}
                              value={value || ''}
                              onChange={(e) => handleChangeEdit(column.id, columnType === 'number' ? Number(e.target.value) : e.target.value)}
                              size="small"
                              fullWidth
                            />
                          )
                        ) : column.format ? (
                          column.format(value)
                        ) : (
                          value?.toString()
                        )}
                      </TableCell>
                    );
                  })}
                  
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      {isEditing ? (
                        <>
                          <Tooltip title="Guardar">
                            <IconButton onClick={handleSaveEdit} color="primary">
                              <SaveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancelar">
                            <IconButton onClick={handleCancelEdit} color="secondary">
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Editar">
                            <IconButton onClick={() => handleEdit(row)} color="primary">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => handleDelete(row.id)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Paper>
  );
};

export default ComponentResponsiveTable;



// import React, { useState } from 'react';
// import ComponentResponsiveTable from './ComponentResponsiveTable';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   age: number;
//   active: boolean;
// }

// const UserTable = () => {
//   const [users, setUsers] = useState<User[]>([
//     { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, active: true },
//     { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, active: false },
//     // ... más usuarios
//   ]);

//   const handleEdit = async (id: string, field: string, value: any) => {
//     setUsers(prev => prev.map(user => 
//       user.id === id ? { ...user, [field]: value } : user
//     ));
//     // Aquí podrías también hacer una llamada API para guardar los cambios
//   };

//   const handleDelete = async (id: string) => {
//     setUsers(prev => prev.filter(user => user.id !== id));
//     // Aquí podrías también hacer una llamada API para eliminar el registro
//   };

//   const handleSelectionChange = (selected: string[]) => {
//     console.log('Selected IDs:', selected);
//   };

//   const columns = [
//     { id: 'name', label: 'Nombre', editable: true },
//     { id: 'email', label: 'Email', editable: true },
//     { id: 'age', label: 'Edad', align: 'right', editable: true, type: 'number' },
//     { id: 'active', label: 'Activo', align: 'center', editable: true, type: 'boolean' },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Tabla de Usuarios</h1>
//       <ComponentResponsiveTable<User>
//         columns={columns}
//         data={users}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         onSelect={handleSelectionChange}
//         initialRowsPerPage={5}
//         sortable={true}
//         selectable={true}
//       />
//     </div>
//   );
// };

// export default UserTable;