import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Safety net when /admin is opened without a locale prefix */
export default function AdminRootRedirect() {
  redirect(`/${defaultLocale}/admin`);
}
