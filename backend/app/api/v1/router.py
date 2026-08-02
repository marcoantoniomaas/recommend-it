from fastapi import APIRouter

from app.api.v1 import categories, recommendations, tags, uploads

api_router = APIRouter()
api_router.include_router(categories.router)
api_router.include_router(tags.router)
api_router.include_router(recommendations.router)
api_router.include_router(uploads.router)
