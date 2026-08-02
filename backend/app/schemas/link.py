from pydantic import BaseModel, ConfigDict, Field


class LinkCreate(BaseModel):
    label: str = Field(min_length=1, max_length=80)
    url: str = Field(min_length=1, max_length=2048)


class LinkRead(LinkCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
