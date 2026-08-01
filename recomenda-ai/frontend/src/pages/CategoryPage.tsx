import { useParams } from "react-router-dom";

import { CardSkeleton } from "@/components/CardSkeleton";
import { RecommendationCard } from "@/components/RecommendationCard";
import { StateMessage } from "@/components/StateMessage";
import { useCategories } from "@/hooks/useCategories";
import { useRecommendations } from "@/hooks/useRecommendations";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: categories = [] } = useCategories();
  const { data, isLoading } = useRecommendations({ category: slug });

  const category = categories.find((item) => item.slug === slug);
  const items = data?.items ?? [];

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-border pb-4">
        <p className="noir-label">Categoria</p>
        <h1 className="noir-title text-4xl text-foreground">{category?.name ?? slug}</h1>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <StateMessage title="Ainda sem recomendações nesta categoria" />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((recommendation) => (
            <RecommendationCard key={recommendation.id} recommendation={recommendation} />
          ))}
        </div>
      )}
    </div>
  );
}
