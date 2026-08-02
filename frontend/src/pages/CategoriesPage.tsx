import { Link } from "react-router-dom";

import { StateMessage } from "@/components/StateMessage";
import { useCategories } from "@/hooks/useCategories";

export function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="noir-label">Navegue por tipo</p>
        <h1 className="noir-title text-4xl text-foreground">Categorias</h1>
      </header>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : categories.length === 0 ? (
        <StateMessage title="Nenhuma categoria cadastrada" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categorias/${category.slug}`}
              className="group noir-panel flex items-center justify-between rounded-sm p-6 transition-colors hover:border-primary/60"
            >
              <span className="noir-title text-2xl text-foreground group-hover:text-primary">
                {category.name}
              </span>
              <span className="noir-label">ver</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
