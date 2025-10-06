export const formatCurrency = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(n)

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
