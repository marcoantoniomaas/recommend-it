from sqlalchemy.orm import Session

from app.core.utils import slugify
from app.models import Category
from app.repositories.category_repository import CategoryRepository
from app.schemas import CategoryCreate


class CategoryService:
    def __init__(self, db: Session) -> None:
        self.repository = CategoryRepository(db)

    def list_all(self) -> list[Category]:
        return self.repository.list_all()

    def create(self, payload: CategoryCreate) -> Category:
        category = Category(name=payload.name, slug=slugify(payload.name), icon=payload.icon)
        return self.repository.create(category)
