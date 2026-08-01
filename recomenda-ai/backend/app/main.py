from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.services.storage_service import storage_service


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        storage_service.ensure_bucket()
    except Exception as exc:  # storage is optional for the API to boot
        print(f"[storage] bucket setup skipped: {exc}")
    yield


app = FastAPI(
    title=settings.app_name,
    description="API do Recomenda Aí — organize recomendações do grupo do WhatsApp.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_origin_regex=r"http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_v1_prefix)


@app.get("/health", tags=["health"])
def health() -> dict[str, str]:
    return {"status": "ok"}
