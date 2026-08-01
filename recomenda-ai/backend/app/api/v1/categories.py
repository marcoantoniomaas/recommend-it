from fastapi import APIRouter, status

from app.api.deps import DbSession
from app.schemas import CategoryCreate, CategoryRead
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryRead], summary="Listar categorias")
def list_categories(db: DbSession) -> list[CategoryRead]:
    return CategoryService(db).list_all()


@router.post(
    "",
    response_model=CategoryRead,
    status_code=status.HTTP_201_CREATED,
    summary="Criar categoria",
)
def create_category(payload: CategoryCreate, db: DbSession) -> CategoryRead:
    return CategoryService(db).create(payload)
