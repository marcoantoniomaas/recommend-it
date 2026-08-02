from sqlalchemy import Column, ForeignKey, Integer, String, Table, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin
from app.models.category import Category
from app.models.link import Link
from app.models.tag import Tag

recommendation_tags = Table(
    "recommendation_tags",
    Base.metadata,
    Column(
        "recommendation_id",
        Integer,
        ForeignKey("recommendations.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


class Recommendation(Base, TimestampMixin):
    __tablename__ = "recommendations"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    recommended_by: Mapped[str] = mapped_column(String(120), index=True, nullable=False)
    cover_image_url: Mapped[str | None] = mapped_column(String(2048))

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id", ondelete="RESTRICT"), index=True, nullable=False
    )

    category: Mapped[Category] = relationship(back_populates="recommendations", lazy="joined")
    links: Mapped[list[Link]] = relationship(
        back_populates="recommendation",
        cascade="all, delete-orphan",
        lazy="selectin",
    )
    tags: Mapped[list[Tag]] = relationship(secondary=recommendation_tags, lazy="selectin")

    # Future: ratings, comments, favorites and user_id relationships plug in here.
