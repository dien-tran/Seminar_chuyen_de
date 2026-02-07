import os
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel, Field
from typing import List, Optional
import sqlite3

DB_PATH = os.path.join(os.path.dirname(__file__), "sns_api.db")

app = FastAPI(
    title="Simple Social Media Application API",
    version="1.0.0",
    description="API for a basic Social Networking Service (SNS) supporting posts, comments, and likes. Follows an API-first approach for web/mobile backends.",
    docs_url="/",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"]
)

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
    CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        comments INTEGER NOT NULL DEFAULT 0
    )
    """)
    c.execute("""
    CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        postId TEXT NOT NULL,
        username TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
    )
    """)
    c.execute("""
    CREATE TABLE IF NOT EXISTS likes (
        postId TEXT NOT NULL,
        username TEXT NOT NULL,
        PRIMARY KEY (postId, username)
    )
    """)
    conn.commit()
    conn.close()

@app.on_event("startup")
def startup():
    init_db()

# Pydantic models (matching openapi.yaml)
class Error(BaseModel):
    message: str

class Post(BaseModel):
    id: str
    username: str
    content: str
    createdAt: str
    updatedAt: str
    likes: int
    comments: int

class PostCreateRequest(BaseModel):
    username: str
    content: str

class PostUpdateRequest(BaseModel):
    username: str
    content: str

class Comment(BaseModel):
    id: str
    postId: str
    username: str
    content: str
    createdAt: str
    updatedAt: str

class CommentCreateRequest(BaseModel):
    username: str
    content: str

class CommentUpdateRequest(BaseModel):
    username: str
    content: str

class LikeRequest(BaseModel):
    username: str

# Endpoints will be implemented in next steps

@app.get("/openapi.yaml", response_class=Response, tags=["docs"])
def get_openapi_yaml():
    with open(os.path.join(os.path.dirname(__file__), "..", "openapi.yaml"), "r", encoding="utf-8") as f:
        return Response(content=f.read(), media_type="text/yaml")

# ...existing code...

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
