from fastapi import APIRouter, Query, status

from app.api.deps import DbSession
from app.schemas import (
    Page,
    RecommendationCreate,
    RecommendationRead,
    RecommendationUpdate,
)
from app.services.recommendation_service import RecommendationService

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get(
    "",
    response_model=Page[RecommendationRead],
    summary="Listar/pesquisar recomendações",
    description="Pesquisa por título, categoria, tags e quem recomendou.",
)
def list_recommendations(
    db: DbSession,
    search: str | None = Query(default=None, description="Termo livre de busca"),
    category: str | None = Query(default=None, description="Slug da categoria"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
) -> Page[RecommendationRead]:
    items, total = RecommendationService(db).search(
        search=search, category_slug=category, page=page, page_size=page_size
    )
    return Page(items=items, total=total, page=page, page_size=page_size)


@router.get("/{recommendation_id}", response_model=RecommendationRead, summary="Detalhes")
def get_recommendation(recommendation_id: int, db: DbSession) -> RecommendationRead:
    return RecommendationService(db).get_or_404(recommendation_id)


@router.post(
    "",
    response_model=RecommendationRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar recomendação",
)
def create_recommendation(payload: RecommendationCreate, db: DbSession) -> RecommendationRead:
    return RecommendationService(db).create(payload)


@router.put("/{recommendation_id}", response_model=RecommendationRead, summary="Editar")
def update_recommendation(
    recommendation_id: int, payload: RecommendationUpdate, db: DbSession
) -> RecommendationRead:
    return RecommendationService(db).update(recommendation_id, payload)


@router.delete(
    "/{recommendation_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Excluir"
)
def delete_recommendation(recommendation_id: int, db: DbSession) -> None:
    RecommendationService(db).delete(recommendation_id)
