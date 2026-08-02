import { useNavigate } from "react-router-dom";

import { RecommendationForm } from "@/components/RecommendationForm";
import { useSaveRecommendation } from "@/hooks/useRecommendations";

export function NewRecommendationPage() {
  const navigate = useNavigate();
  const save = useSaveRecommendation();

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-border pb-4">
        <p className="noir-label">Cadastro</p>
        <h1 className="noir-title text-4xl text-foreground">Nova recomendação</h1>
      </header>

      <RecommendationForm
        submitLabel="Salvar recomendação"
        isSubmitting={save.isPending}
        error={save.error ? String(save.error.message) : null}
        onSubmit={async (payload) => {
          const created = await save.mutateAsync(payload);
          navigate(`/recomendacoes/${created.id}`);
        }}
      />
    </div>
  );
}
