import { useState } from "react";
import { Link } from "react-router-dom";

import { CardSkeleton } from "@/components/CardSkeleton";
import { CategoryChips } from "@/components/CategoryChips";
import { RecommendationCard } from "@/components/RecommendationCard";
import { SearchBar } from "@/components/SearchBar";
import { StateMessage } from "@/components/StateMessage";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { useRecommendations } from "@/hooks/useRecommendations";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const debouncedSearch = useDebounce(search);

  const { data: categories = [] } = useCategories();
  const { data, isLoading, isError } = useRecommendations({
    search: debouncedSearch || undefined,
    category,
  });

  const items = data?.items ?? [];
  const isFiltering = Boolean(debouncedSearch || category);

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="max-w-2xl space-y-3">
          <p className="noir-label">Arquivo do grupo</p>
          <h1 className="noir-title text-5xl leading-none text-foreground sm:text-6xl">
            Tudo que indicaram,{" "}
            <span className="text-primary">sem rolar o chat</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Filmes, séries, jogos, livros, restaurantes e lugares — catalogados, buscáveis e com
            os links certos.
          </p>
        </div>

        <SearchBar value={search} onChange={setSearch} />
        <CategoryChips categories={categories} active={category} onSelect={setCategory} />
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between border-b border-border pb-3">
          <h2 className="noir-title text-2xl text-foreground">
            {isFiltering ? "Resultados" : "Últimas recomendações"}
          </h2>
          <span className="noir-label">{data?.total ?? 0} itens</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <StateMessage
            title="Não deu para carregar"
            description="Confira se a API está no ar em http://localhost:8000."
          />
        ) : items.length === 0 ? (
          <StateMessage
            title="Nada por aqui"
            description={
              isFiltering
                ? "Tente outro termo ou remova os filtros."
                : "Cadastre a primeira recomendação do grupo."
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        )}
      </section>

      <section className="noir-panel flex flex-wrap items-center justify-between gap-4 rounded-sm p-6">
        <div>
          <h3 className="noir-title text-xl text-foreground">Viu algo bom?</h3>
          <p className="text-sm text-muted-foreground">Registra aqui antes que suma no chat.</p>
        </div>
        <Button asChild>
          <Link to="/recomendacoes/nova">Nova recomendação</Link>
        </Button>
      </section>
    </div>
  );
}
