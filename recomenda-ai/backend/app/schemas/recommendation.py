from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.category import CategoryRead
from app.schemas.link import LinkCreate, LinkRead
from app.schemas.tag import TagRead


class RecommendationBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str | None = None
    recommended_by: str = Field(min_length=1, max_length=120)
    cover_image_url: str | None = None
    category_id: int


class RecommendationCreate(RecommendationBase):
    tags: list[str] = Field(default_factory=list)
    links: list[LinkCreate] = Field(default_factory=list)


class RecommendationUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = None
    recommended_by: str | None = Field(default=None, min_length=1, max_length=120)
    cover_image_url: str | None = None
    category_id: int | None = None
    tags: list[str] | None = None
    links: list[LinkCreate] | None = None


class RecommendationRead(RecommendationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
    category: CategoryRead
    tags: list[TagRead]
    links: list[LinkRead]
