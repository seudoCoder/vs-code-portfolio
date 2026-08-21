from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import portfolio

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio.router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
