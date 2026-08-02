from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models import Link, Recommendation
from app.repositories.category_repository import CategoryRepository
from app.repositories.recommendation_repository import RecommendationRepository
from app.repositories.tag_repository import TagRepository
from app.schemas import RecommendationCreate, RecommendationUpdate


class RecommendationService:
    """Business rules for recommendations. Auth/ownership checks land here later."""

    def __init__(self, db: Session) -> None:
        self.db = db
        self.repository = RecommendationRepository(db)
        self.tags = TagRepository(db)
        self.categories = CategoryRepository(db)

    def search(self, **kwargs) -> tuple[list[Recommendation], int]:
        return self.repository.search(**kwargs)

    def get_or_404(self, recommendation_id: int) -> Recommendation:
        recommendation = self.repository.get(recommendation_id)
        if recommendation is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Recomendação não encontrada"
            )
        return recommendation

    def _ensure_category(self, category_id: int) -> None:
        if self.categories.get(category_id) is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Categoria inválida"
            )

    def create(self, payload: RecommendationCreate) -> Recommendation:
        self._ensure_category(payload.category_id)
        recommendation = Recommendation(
            title=payload.title,
            description=payload.description,
            recommended_by=payload.recommended_by,
            cover_image_url=payload.cover_image_url,
            category_id=payload.category_id,
        )
        recommendation.tags = self.tags.get_or_create_many(payload.tags)
        recommendation.links = [Link(label=l.label, url=l.url) for l in payload.links]
        return self.repository.add(recommendation)

    def update(self, recommendation_id: int, payload: RecommendationUpdate) -> Recommendation:
        recommendation = self.get_or_404(recommendation_id)
        data = payload.model_dump(exclude_unset=True)

        if "category_id" in data and data["category_id"] is not None:
            self._ensure_category(data["category_id"])

        if "tags" in data and data["tags"] is not None:
            recommendation.tags = self.tags.get_or_create_many(data.pop("tags"))
        else:
            data.pop("tags", None)

        if "links" in data and data["links"] is not None:
            links = data.pop("links")
            recommendation.links.clear()
            self.db.flush()
            recommendation.links = [Link(label=l["label"], url=l["url"]) for l in links]
        else:
            data.pop("links", None)

        for field, value in data.items():
            setattr(recommendation, field, value)

        self.db.flush()
        return recommendation

    def delete(self, recommendation_id: int) -> None:
        self.repository.delete(self.get_or_404(recommendation_id))
