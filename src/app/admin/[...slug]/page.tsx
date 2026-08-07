import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

export default async function AdminSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug?.length ? slug.join("/") : "";
  redirect(`/${defaultLocale}/admin${path ? `/${path}` : ""}`);
}
