import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "@/types";

interface Props {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: Props) {
  return (
    <Link
      to={`/recomendacoes/${recommendation.id}`}
      className="group block animate-fade-up overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-noir"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {recommendation.cover_image_url ? (
          <img
            src={recommendation.cover_image_url}
            alt={`Capa de ${recommendation.title}`}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[0.55] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="noir-title text-5xl text-muted-foreground/30">
              {recommendation.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-noir-fade opacity-90" />
        <Badge className="absolute left-2 top-2">{recommendation.category.name}</Badge>
      </div>

      <div className="space-y-1 p-4">
        <h3 className="noir-title truncate text-lg leading-tight text-foreground group-hover:text-primary">
          {recommendation.title}
        </h3>
        <p className="noir-label">por {recommendation.recommended_by}</p>
      </div>
    </Link>
  );
}
