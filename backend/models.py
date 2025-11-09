from typing import List, Optional
from pydantic import BaseModel


class Question(BaseModel):
    question: str
    options: List[str]
    correct_index: int
    explanation: Optional[str] = None


class QuizOutput(BaseModel):
    title: Optional[str]
    summary: Optional[str]
    keywords: Optional[List[str]] = []
    questions: List[Question]
    source_url: Optional[str] = None
    generated_at: Optional[str] = None
