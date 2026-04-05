export const FREE_SHIPPING_THRESHOLD = 49;
export const SHIPPING_COST = 4.95;

export function calculateShipping(subtotal: number): number {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}
