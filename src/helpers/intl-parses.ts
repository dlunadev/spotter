export const IntlParser = (value: number): number => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(parseFloat(String(value))) as unknown as number;
};
