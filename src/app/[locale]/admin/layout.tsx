/**
 * Admin shell fills the viewport. Body scroll is locked by LocaleShell.
 * Only the sidebar nav and main content panes scroll independently.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden bg-[#0f1319] text-zinc-100">
      {children}
    </div>
  );
}
