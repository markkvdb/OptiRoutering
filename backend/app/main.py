"""Entrypoint to the web application."""


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pyvrp import Model
from pyvrp.stop import MaxRuntime

from app.models import RouteDefinitionRequest
from app.solver import create_problem_data

app = FastAPI()

origins = [
    "http://127.0.0.1:3000",
    "http://web:3000",
    "http://web"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/solve")
async def solve(route_definition: RouteDefinitionRequest) -> list[int]:
    """Solve and return order of customers to visit."""
    problem_data = create_problem_data(route_definition)
    model = Model.from_data(problem_data)
    result = model.solve(stop=MaxRuntime(max_runtime=1))

    return result.best.get_routes()[0].visits()
