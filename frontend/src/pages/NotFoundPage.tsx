import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <h1 className="noir-title text-7xl text-primary">404</h1>
      <p className="mt-3 text-sm text-muted-foreground">Essa página sumiu no escuro.</p>
      <Button asChild className="mt-6">
        <Link to="/">Voltar ao início</Link>
      </Button>
    </div>
  );
}
