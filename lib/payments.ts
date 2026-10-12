/**
 * Card (Stripe) payments are currently switched off: Stripe payouts are on hold
 * pending account verification, so card takings could not be withdrawn.
 * Set this to `true` to turn card payments back on. The checkout page and the
 * card payment route both read it, so a switched-off card route can't be used
 * directly either. Everything else is wired up.
 */
export const CARD_PAYMENTS_ENABLED = false;
