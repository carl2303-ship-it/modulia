import type { Customer, Order } from "@/lib/crm/types";

export type OrderEditPayload = {
  id: string;
  model: string | null;
  configuration: string | null;
  price_ttc: number;
  notes: string | null;
  delivery_name: string | null;
  delivery_email: string | null;
  delivery_phone: string | null;
  delivery_street: string | null;
  delivery_postal_code: string | null;
  delivery_city: string | null;
  marketing_opt_in: boolean;
};

export function toOrderEditPayload(order: Order, customer?: Customer | null): OrderEditPayload {
  return {
    id: order.id,
    model: order.model,
    configuration: order.configuration,
    price_ttc: order.price_ttc,
    notes: order.notes,
    delivery_name: order.delivery_name,
    delivery_email: order.delivery_email,
    delivery_phone: order.delivery_phone,
    delivery_street: order.delivery_street,
    delivery_postal_code: order.delivery_postal_code,
    delivery_city: order.delivery_city,
    marketing_opt_in: customer?.marketing_opt_in ?? false,
  };
}
