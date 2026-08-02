import { Link, NavLink, Outlet } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Início", end: true },
  { to: "/categorias", label: "Categorias", end: false },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-background bg-grain">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="noir-title text-2xl text-foreground">Recomenda</span>
            <span className="noir-title text-2xl text-primary">Aí</span>
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button asChild size="sm">
            <Link to="/recomendacoes/nova">
              <Plus className="h-3.5 w-3.5" />
              Nova
            </Link>
          </Button>
        </div>
      </header>

      <main className="container py-10">
        <Outlet />
      </main>

      <footer className="border-t border-border py-8">
        <div className="container flex flex-wrap items-center justify-between gap-3">
          <p className="noir-label">Recomenda Aí — MVP</p>
          <p className="text-xs text-muted-foreground">
            O que o grupo indicou, num lugar só.
          </p>
        </div>
      </footer>
    </div>
  );
}
