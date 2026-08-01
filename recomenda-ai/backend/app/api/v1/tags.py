from fastapi import APIRouter

from app.api.deps import DbSession
from app.schemas import TagRead
from app.services.tag_service import TagService

router = APIRouter(prefix="/tags", tags=["tags"])


@router.get("", response_model=list[TagRead], summary="Listar tags")
def list_tags(db: DbSession) -> list[TagRead]:
    return TagService(db).list()
