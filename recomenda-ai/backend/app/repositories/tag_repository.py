from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.utils import slugify
from app.models import Tag


class TagRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_all(self) -> list[Tag]:
        return list(self.db.scalars(select(Tag).order_by(Tag.name)))

    def get_or_create_many(self, names: list[str]) -> list[Tag]:
        tags: list[Tag] = []
        for raw in names:
            name = raw.strip()
            if not name:
                continue
            slug = slugify(name)
            tag = self.db.scalar(select(Tag).where(Tag.slug == slug))
            if tag is None:
                tag = Tag(name=name, slug=slug)
                self.db.add(tag)
                self.db.flush()
            if tag not in tags:
                tags.append(tag)
        return tags
