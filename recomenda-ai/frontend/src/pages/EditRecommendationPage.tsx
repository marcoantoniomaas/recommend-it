import { useNavigate, useParams } from "react-router-dom";

import { RecommendationForm } from "@/components/RecommendationForm";
import { StateMessage } from "@/components/StateMessage";
import { useRecommendation, useSaveRecommendation } from "@/hooks/useRecommendations";

export function EditRecommendationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recommendationId = Number(id);
  const { data: recommendation, isLoading } = useRecommendation(recommendationId);
  const save = useSaveRecommendation(recommendationId);

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando...</p>;
  if (!recommendation) return <StateMessage title="Recomendação não encontrada" />;

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-border pb-4">
        <p className="noir-label">Edição</p>
        <h1 className="noir-title text-4xl text-foreground">{recommendation.title}</h1>
      </header>

      <RecommendationForm
        initialValue={recommendation}
        submitLabel="Salvar alterações"
        isSubmitting={save.isPending}
        error={save.error ? String(save.error.message) : null}
        onSubmit={async (payload) => {
          await save.mutateAsync(payload);
          navigate(`/recomendacoes/${recommendationId}`);
        }}
      />
    </div>
  );
}
