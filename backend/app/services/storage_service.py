import uuid
from typing import BinaryIO

import boto3
from botocore.client import Config

from app.core.config import settings


class StorageService:
    """Thin wrapper over MinIO (S3 compatible) used for cover images."""

    def __init__(self) -> None:
        self.client = boto3.client(
            "s3",
            endpoint_url=settings.minio_endpoint,
            aws_access_key_id=settings.minio_access_key,
            aws_secret_access_key=settings.minio_secret_key,
            config=Config(signature_version="s3v4"),
            region_name="us-east-1",
        )
        self.bucket = settings.minio_bucket

    def ensure_bucket(self) -> None:
        buckets = {b["Name"] for b in self.client.list_buckets().get("Buckets", [])}
        if self.bucket not in buckets:
            self.client.create_bucket(Bucket=self.bucket)
        self.client.put_bucket_policy(
            Bucket=self.bucket,
            Policy=(
                '{"Version":"2012-10-17","Statement":[{"Effect":"Allow",'
                '"Principal":{"AWS":["*"]},"Action":["s3:GetObject"],'
                f'"Resource":["arn:aws:s3:::{self.bucket}/*"]}}]}}'
            ),
        )

    def upload(self, file: BinaryIO, filename: str, content_type: str) -> str:
        extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else "bin"
        key = f"covers/{uuid.uuid4().hex}.{extension}"
        self.client.upload_fileobj(
            file, self.bucket, key, ExtraArgs={"ContentType": content_type}
        )
        return f"{settings.minio_public_endpoint}/{self.bucket}/{key}"


storage_service = StorageService()
