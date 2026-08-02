from sqlalchemy import Select, func, or_, select
from sqlalchemy.orm import Session

from app.models import Category, Recommendation, Tag, recommendation_tags


class RecommendationRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def _base_query(
        self, search: str | None = None, category_slug: str | None = None
    ) -> Select[tuple[Recommendation]]:
        stmt = select(Recommendation)

        if category_slug:
            stmt = stmt.join(Category, Recommendation.category_id == Category.id).where(
                Category.slug == category_slug
            )

        if search:
            term = f"%{search.lower()}%"
            tag_subquery = (
                select(recommendation_tags.c.recommendation_id)
                .join(Tag, Tag.id == recommendation_tags.c.tag_id)
                .where(func.lower(Tag.name).like(term))
            )
            category_subquery = select(Category.id).where(func.lower(Category.name).like(term))
            stmt = stmt.where(
                or_(
                    func.lower(Recommendation.title).like(term),
                    func.lower(Recommendation.recommended_by).like(term),
                    Recommendation.category_id.in_(category_subquery),
                    Recommendation.id.in_(tag_subquery),
                )
            )

        return stmt

    def search(
        self,
        *,
        search: str | None = None,
        category_slug: str | None = None,
        page: int = 1,
        page_size: int = 20,
    ) -> tuple[list[Recommendation], int]:
        stmt = self._base_query(search, category_slug)
        total = self.db.scalar(
            select(func.count()).select_from(stmt.subquery())
        ) or 0
        rows = self.db.scalars(
            stmt.order_by(Recommendation.created_at.desc())
            .offset((page - 1) * page_size)
            .limit(page_size)
        ).unique()
        return list(rows), total

    def get(self, recommendation_id: int) -> Recommendation | None:
        return self.db.get(Recommendation, recommendation_id)

    def add(self, recommendation: Recommendation) -> Recommendation:
        self.db.add(recommendation)
        self.db.flush()
        return recommendation

    def delete(self, recommendation: Recommendation) -> None:
        self.db.delete(recommendation)
        self.db.flush()
