/**
 * Admin layout uses a fixed full-viewport overlay (z-[60]) to cover the
 * marketing SiteHeader/SiteFooter from the parent [locale] layout.
 * Restructuring the locale layout to exclude admin routes would be cleaner
 * long-term; this overlay approach avoids marketing chrome interference.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#0f1319] text-zinc-100">
      {children}
    </div>
  );
}
