from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.services.storage_service import storage_service

router = APIRouter(prefix="/uploads", tags=["uploads"])

ALLOWED = {"image/jpeg", "image/png", "image/webp", "image/gif"}


@router.post("/cover", summary="Upload de imagem de capa")
def upload_cover(file: UploadFile = File(...)) -> dict[str, str]:
    if file.content_type not in ALLOWED:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Formato de imagem não suportado",
        )
    url = storage_service.upload(file.file, file.filename or "cover", file.content_type)
    return {"url": url}
