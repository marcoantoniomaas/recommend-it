import { ArrowLeft, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { StateMessage } from "@/components/StateMessage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteRecommendation, useRecommendation } from "@/hooks/useRecommendations";
import { formatDate } from "@/lib/utils";

export function RecommendationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recommendation, isLoading, isError } = useRecommendation(Number(id));
  const remove = useDeleteRecommendation();

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  if (isError || !recommendation) return <StateMessage title="Recomendação não encontrada" />;

  const handleDelete = async () => {
    if (!window.confirm("Excluir esta recomendação?")) return;
    await remove.mutateAsync(recommendation.id);
    navigate("/");
  };

  return (
    <article className="space-y-8">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="overflow-hidden rounded-sm border border-border bg-secondary">
          {recommendation.cover_image_url ? (
            <img
              src={recommendation.cover_image_url}
              alt={`Capa de ${recommendation.title}`}
              className="aspect-[2/3] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center">
              <span className="noir-title text-6xl text-muted-foreground/30">
                {recommendation.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <header className="space-y-3">
            <Badge>{recommendation.category.name}</Badge>
            <h1 className="noir-title text-4xl leading-none text-foreground sm:text-5xl">
              {recommendation.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Recomendado por{" "}
              <span className="text-foreground">{recommendation.recommended_by}</span> ·{" "}
              {formatDate(recommendation.created_at)}
            </p>
          </header>

          {recommendation.description ? (
            <p className="max-w-2xl whitespace-pre-line leading-relaxed text-foreground/85">
              {recommendation.description}
            </p>
          ) : null}

          {recommendation.tags.length > 0 ? (
            <div className="space-y-2">
              <p className="noir-label">Tags</p>
              <div className="flex flex-wrap gap-2">
                {recommendation.tags.map((tag) => (
                  <Badge key={tag.id} variant="muted">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          {recommendation.links.length > 0 ? (
            <div className="space-y-2">
              <p className="noir-label">Links</p>
              <div className="flex flex-wrap gap-2">
                {recommendation.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild variant="outline">
              <Link to={`/recomendacoes/${recommendation.id}/editar`}>
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={remove.isPending}>
              <Trash2 className="h-3.5 w-3.5" />
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
