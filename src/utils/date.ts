export function formatDateTime(date: string | number | Date): string {
  const value = new Date(date)
  return value.toLocaleString('zh-CN', {
    hour12: false,
  })
}

