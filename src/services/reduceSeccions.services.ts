import { MenuItem } from "../../hooks/useMenuData"

export const reduceSeccions = (data: any) => {
    return data?.reduce(
        (acc: any, item: any) => {
            acc[item.Section] = acc[item.Section] || []
            acc[item.Section].push(item)
            return acc
        },
        {} as Record<string, MenuItem[]>,
    )
}