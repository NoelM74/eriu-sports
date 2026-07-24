"use client";

import { createContext, useContext, useEffect, useReducer, useState, ReactNode } from "react";
import { getProduct, orderTotal, totalQty } from "@/lib/catalog";
import type { SizeRun, BrandingMethod } from "@/lib/catalog/types";

export interface OrderLine {
  id: string;
  slug: string;
  colourwayId: string;
  run: SizeRun;
  method: BrandingMethod;
  placement: string;
  namesNumbers: boolean;
}

interface OrderState {
  lines: OrderLine[];
}

type Action =
  | { type: "ADD"; line: OrderLine }
  | { type: "UPDATE"; id: string; patch: Partial<OrderLine> }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; lines: OrderLine[] };

function reducer(state: OrderState, action: Action): OrderState {
  switch (action.type) {
    case "ADD":
      return { lines: [...state.lines, action.line] };
    case "UPDATE":
      return {
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, ...action.patch } : l)),
      };
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "CLEAR":
      return { lines: [] };
    case "HYDRATE":
      return { lines: action.lines };
    default:
      return state;
  }
}

/** Live pricing for a single line, derived from the current catalogue. */
export function lineSummary(line: OrderLine) {
  const product = getProduct(line.slug);
  if (!product) return { qty: totalQty(line.run), unit: 0, total: 0, meetsMoq: false, savingsPct: 0, product: undefined };
  const s = orderTotal(product, line.run, line.namesNumbers);
  return { ...s, product };
}

interface OrderContextValue {
  lines: OrderLine[];
  totalUnits: number;
  totalLines: number;
  orderTotal: number;
  addLine: (line: Omit<OrderLine, "id">) => void;
  updateLine: (id: string, patch: Partial<OrderLine>) => void;
  removeLine: (id: string) => void;
  clear: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);
const KEY = "eriu_order";

export function BulkOrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const lines = JSON.parse(saved) as OrderLine[];
        if (Array.isArray(lines)) dispatch({ type: "HYDRATE", lines });
      }
    } catch {
      /* start empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state.lines));
    } catch {
      /* ignore quota */
    }
  }, [state.lines, hydrated]);

  const totalUnits = state.lines.reduce((sum, l) => sum + totalQty(l.run), 0);
  const orderTotalValue =
    Math.round(state.lines.reduce((sum, l) => sum + lineSummary(l).total, 0) * 100) / 100;

  return (
    <OrderContext.Provider
      value={{
        lines: state.lines,
        totalUnits,
        totalLines: state.lines.length,
        orderTotal: orderTotalValue,
        addLine: (line) =>
          dispatch({
            type: "ADD",
            line: { ...line, id: `${line.slug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` },
          }),
        updateLine: (id, patch) => dispatch({ type: "UPDATE", id, patch }),
        removeLine: (id) => dispatch({ type: "REMOVE", id }),
        clear: () => dispatch({ type: "CLEAR" }),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within BulkOrderProvider");
  return ctx;
}
