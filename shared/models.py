from pydantic import BaseModel
from typing import Optional, Any, Dict

class PipelineContext(BaseModel):
    ontology_result: Optional[Dict[str, Any]] = None
    article_draft: Optional[str] = None
    factcheck_passed: Optional[bool] = None
    viz_chart_url: Optional[str] = None

class EventPayload(BaseModel):
    task_id: str
    company_code: str
    company_name: str
    event_type: str
    raw_data: Dict[str, Any]
    context: PipelineContext = PipelineContext()
    status: str = "pending"
