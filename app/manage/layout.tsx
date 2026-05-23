export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface-secondary)]">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--brand-magenta)] to-[var(--brand-coral)] flex items-center justify-center text-white font-bold text-sm">
            M
          </div>
          <span className="font-display font-semibold text-lg">Admin Panel</span>
        </div>
        <a
          href="/"
          target="_blank"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-magenta)] transition-colors font-medium"
        >
          View Site →
        </a>
      </header>
      {children}
    </div>
  );
}