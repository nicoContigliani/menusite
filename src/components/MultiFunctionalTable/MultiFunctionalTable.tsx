
"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Table, Button, Space, Input, Popconfirm, Form, type InputRef } from "antd"
import type { ColumnType, TableProps } from "antd/es/table"
import { SearchOutlined } from "@ant-design/icons"
import styles from './MultiFuntionalTable.module.css'

interface MultiFunctionalTableProps<T extends { id: string | number }> {
  data: T[]
  columns: ColumnType<T>[]
  paginationConfig?: boolean | TableProps<T>["pagination"]
  sortable?: boolean
  searchable?: boolean
  expandable?: boolean
  editable?: boolean
  onRowDelete?: (record: T) => void
  onRowEdit?: (oldRecord: T, newRecord: T) => void
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: "number" | "text"
  record: any
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputRef = useRef<InputRef>(null)

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input ref={inputRef} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const MultiFunctionalTable = <T extends { id: string | number }>({
  data,
  columns,
  paginationConfig = true,
  sortable = true,
  searchable = true,
  expandable = false,
  editable = false,
  onRowDelete,
  onRowEdit,
}: MultiFunctionalTableProps<T>) => {
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = useState<string | number>("")
  const [filteredData, setFilteredData] = useState<T[]>(data)

  const isEditing = (record: T) => record.id === editingKey

  const edit = (record: T) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record.id)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async (key: string | number) => {
    try {
      const row = await form.validateFields()
      const newData = [...filteredData]
      const index = newData.findIndex((item) => key === item.id)
      if (index > -1) {
        const oldItem = newData[index]
        const newItem = { ...oldItem, ...row }
        newData.splice(index, 1, newItem)
        setFilteredData(newData)
        setEditingKey("")
        if (onRowEdit) {
          onRowEdit(oldItem, newItem)
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }

  const handleSearch = useCallback(
    (value: string, confirm: () => void, dataIndex: keyof T) => {
      confirm()
      const filtered = data.filter((item) => String(item[dataIndex]).toLowerCase().includes(value.toLowerCase()))
      setFilteredData(filtered)
    },
    [data],
  )

  const handleReset = useCallback(
    (clearFilters: () => void) => {
      clearFilters()
      setFilteredData(data)
    },
    [data],
  )

  const expandedRowRender = (record: T) => <pre>{JSON.stringify(record, null, 2)}</pre>

  const handleDelete = (record: T) => {
    if (onRowDelete) {
      onRowDelete(record)
      setFilteredData((prevData) => prevData.filter((item) => item.id !== record.id))
    }
  }

  const modifiedColumns: ColumnType<T>[] = columns.map((col) => ({
    ...col,
    ellipsis: true,
    width: 150,
    sorter: sortable
      ? (a: T, b: T) => {
        const aVal = a[col.dataIndex as keyof T]
        const bVal = b[col.dataIndex as keyof T]
        return String(aVal).localeCompare(String(bVal))
      }
      : undefined,
    ...(searchable
      ? {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${String(col.title)}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys[0] as string, confirm, col.dataIndex as keyof T)}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys[0] as string, confirm, col.dataIndex as keyof T)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters!)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value, record) =>
          record[col.dataIndex as keyof T]
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()) ?? false,
      }
      : {}),
  }))

  if (editable || onRowDelete) {
    modifiedColumns.push({
      title: "Action",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_: any, record: T) => {
        const editing = isEditing(record)
        return editing ? (
          <span>
            <a onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            {editable && (
              <a
                onClick={() => (editingKey === "" ? edit(record) : undefined)}
                style={{
                  marginRight: 8,
                  color: editingKey !== "" ? "#d9d9d9" : "",
                  cursor: editingKey !== "" ? "not-allowed" : "pointer",
                }}
              >
                Edit
              </a>
            )}
            {onRowDelete && (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
                <a>Delete</a>
              </Popconfirm>
            )}
          </span>
        )
      },
    })
  }

  const paginationProps =
    paginationConfig === true
      ? {
        pageSize: 10,
        total: filteredData.length,
        showSizeChanger: true,
      }
      : paginationConfig

  const components = editable
    ? {
      body: {
        cell: EditableCell,
      },
    }
    : {}

  return (
    <div className={styles.content}>
      <div className={styles.anttable}>

        <Form form={form} component={false}>
          <Table<T>
            components={components}
            columns={modifiedColumns}
            dataSource={filteredData}
            pagination={paginationProps}
            expandable={expandable ? { expandedRowRender } : undefined}
            rowKey="id"
            scroll={{ x: 'max-content' }}  /* Asegura que la tabla se expanda según sea necesario */
            bordered
            size="small"
          />
        </Form>
      </div>

    </div>
  )
}

export default MultiFunctionalTable


// //**************************Uso de la tabla*************************** */
// //******************************************************************** */

// // //tabla

// //   // Datos de ejemplo
// //   const data: DataType[] = [
// //     { id: 1, name: "John Brown", age: 32, address: "New York No. 1 Lake Park" },
// //     { id: 2, name: "Jim Green", age: 42, address: "London No. 1 Bridge Street" },
// //     { id: 3, name: "Joe Black", age: 32, address: "Sydney No. 1 York Street" },
// //     { id: 4, name: "Jim Red", age: 32, address: "London No. 2 Bridge Street" },
// //   ]

// //   // Definición de las columnas
// //   const columns: ColumnType<DataType>[] = [
// //     {
// //       title: "Name",
// //       dataIndex: "name",
// //       key: "name",
// //     },
// //     {
// //       title: "Age",
// //       dataIndex: "age",
// //       key: "age",
// //     },
// //     {
// //       title: "Address",
// //       dataIndex: "address",
// //       key: "address",
// //     },
// //   ]

// //   // Función para manejar la eliminación de una fila
// //   const handleDelete = (record: DataType) => {
// //     console.log("Deleting:", record)
// //     // Aquí implementarías la lógica real para eliminar el registro
// //   }

// //   // Función para manejar la edición de una fila
// //   const handleEdit = (oldRecord: DataType, newRecord: DataType) => {
// //     console.log("Editing:", oldRecord, "to", newRecord)
// //     // Aquí implementarías la lógica real para actualizar el registro
// //   }

// //uso

// //         < div style = {{ padding: "20px" }}>
// //             <h1>Multi-Functional Table Example</h1>
// //             <MultiFunctionalTable<DataType>
// //               data={data}
// //               columns={columns}
// //               sortable
// //               searchable
// //               expandable
// //               editable
// //               paginationConfig={{ pageSize: 5 }}
// //               onRowDelete={handleDelete}
// //               onRowEdit={handleEdit}
// //             />
// //           </div >




// //******************************************************************** */
// //******************************************************************** */


