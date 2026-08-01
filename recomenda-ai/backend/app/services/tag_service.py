from sqlalchemy.orm import Session

from app.models import Tag
from app.repositories.tag_repository import TagRepository


class TagService:
    def __init__(self, db: Session) -> None:
        self.repository = TagRepository(db)

    def list_all(self) -> list[Tag]:
        return self.repository.list_all()
