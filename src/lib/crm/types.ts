/** Types & labels CRM Modulia (FR) */

export type UserRole = "owner" | "showroom" | "agent";
export type LeadSource = "website" | "showroom" | "owner" | "iad";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type PipelineStatus = "pending" | "ordered" | "in_production" | "installed";
export type PaymentStatus = "unpaid" | "partial" | "paid";
export type CommissionPaymentStatus = "a_pagar" | "pago";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  phone: string | null;
  agency: string | null;
  commission_rate_pct: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  marketing_opt_in: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  customer_id: string | null;
  assigned_to: string | null;
  source: LeadSource;
  status: LeadStatus;
  name: string;
  email: string;
  phone: string | null;
  model: string | null;
  message: string | null;
  configuration: string | null;
  total_price_ttc: number | null;
  created_at: string;
  updated_at: string;
  assignee?: Profile | null;
  customer?: Customer | null;
};

export type Order = {
  id: string;
  customer_id: string | null;
  assigned_to: string | null;
  lead_id: string | null;
  source: LeadSource;
  pipeline_status: PipelineStatus;
  payment_status: PaymentStatus;
  model: string | null;
  configuration: string | null;
  price_ttc: number;
  amount_paid: number;
  amount_due: number;
  delivery_name: string | null;
  delivery_email: string | null;
  delivery_phone: string | null;
  delivery_street: string | null;
  delivery_postal_code: string | null;
  delivery_city: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  assignee?: Profile | null;
  customer?: Customer | null;
};

export type CommissionEntry = {
  id: string;
  order_id: string;
  agent_id: string;
  rate_pct: number;
  base_ttc: number;
  amount: number;
  payment_status: CommissionPaymentStatus;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  agent?: Profile | null;
  order?: Order | null;
};

export type MailingList = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  member_count?: number;
};

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Propriétaire",
  showroom: "Showroom",
  agent: "Commercial IAD",
};

export const SOURCE_LABELS: Record<LeadSource, string> = {
  website: "Site web",
  showroom: "Showroom",
  owner: "Propriétaire",
  iad: "IAD",
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
  converted: "Converti",
  lost: "Perdu",
};

export const PIPELINE_LABELS: Record<PipelineStatus, string> = {
  pending: "Pending",
  ordered: "Commandé",
  in_production: "En production",
  installed: "Installé",
};

export const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  unpaid: "À payer",
  partial: "Partiel",
  paid: "Payé",
};

export const COMMISSION_PAYMENT_LABELS: Record<CommissionPaymentStatus, string> = {
  a_pagar: "À payer",
  pago: "Payé",
};

export function roleToSource(role: UserRole): LeadSource {
  if (role === "showroom") return "showroom";
  if (role === "owner") return "owner";
  return "iad";
}

/** Extrait un montant numérique depuis "9 450 € TTC" ou "9450" */
export function parsePriceTtc(value?: string | null): number | null {
  if (!value) return null;
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

export function formatEuro(value: number | null | undefined): string {
  const n = value ?? 0;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}
