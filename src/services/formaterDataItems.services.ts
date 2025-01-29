import React, { useMemo } from 'react';
import { Badge, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

// Formatter function
interface FormatOptions {
  customChildren?: (key: string, value: any) => React.ReactNode;
}

export const FormaterDataItems = (
  obj: Record<string, any>,
  options?: FormatOptions
): DescriptionsProps['items'] => {
  return Object.keys(obj).map((key, index) => ({
    key: `${index + 1}`,
    label: key,
    children: options?.customChildren ? options.customChildren(key, obj[key]) : obj[key],
  }));
};