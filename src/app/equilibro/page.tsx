import { redirect } from "next/navigation";

/** Ancien configurateur EQUILIBRO — redirigé vers le configurateur unifié */
export default function EquilibroPage() {
  redirect("/personnaliser?model=equilibro");
}
