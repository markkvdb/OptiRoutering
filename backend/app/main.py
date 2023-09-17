"""Entrypoint to the web application."""


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pyvrp import Model
from pyvrp.stop import MaxRuntime

from app.models import (Coordinates, Customer, Location, RouteDefinition,
                        RouteDefinitionRequest)
from app.solver import create_problem_data

app = FastAPI()

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

route_definitions: dict[int, RouteDefinition] = {
    0: RouteDefinition(
        id=0,
        depot=Location(
            address="Molenweg 4, 9984 XD Oudeschip, Netherlands",
            coordinates=Coordinates(
                lat=53.43018852613383,
                lng=6.822970358886225
            )
        ),
        customers=[
            Customer(
                name="Pieter Post",
                location=Location(
                    address="Reitdiepskade 13, 9974 PJ Zoutkamp, Netherlands",
                    coordinates=Coordinates(
                        lat=53.336757963170854,
                        lng=6.299897371189074
                    )
                )
            ),
            Customer(
                name="Jip en Janneke",
                location=Location(
                    address="Oostindie 29, 9354 TD Zevenhuizen, Netherlands",
                    coordinates=Coordinates(
                        lat=53.134751495726526,
                        lng=6.371766641002621
                    )
                )
            ),
            Customer(
                name="Meneer Bol",
                location=Location(
                    address="De Snik 20, 9974 NE Zoutkamp, Netherlands",
                    coordinates=Coordinates(
                        lat=53.33857250886743,
                        lng=6.312097396543164,
                    )
                )
            )
        ],
        maximum_capacity=None,
        time_windows=False
    )
}


@app.post("/routes")
async def route(route_request: RouteDefinitionRequest) -> RouteDefinition:
    """Calculate the optimal route for the given route definition."""
    route_definition = RouteDefinition(
        id=len(route_definitions),
        **route_request.dict()
    )
    route_definitions[route_definition.id] = route_definition

    return route_definition


@app.get("/routes/{id}")
async def route(id: int) -> RouteDefinition:
    """Get the route definition for the given route id."""
    if id not in route_definitions:
        raise HTTPException(status_code=404, detail="Route not found")

    return route_definitions[id]


@app.get("/routes")
async def routes() -> list[RouteDefinition]:
    """Get all route definitions."""
    return list(route_definitions.values())


@app.post("/routes/{id}/solve")
async def solve(id: int, max_runtime: int = 1) -> list[int]:
    """Solve and return order of customers to visit."""
    if id not in route_definitions:
        raise HTTPException(status_code=404, detail="Route not found")

    problem_data = create_problem_data(route_definitions[id])
    model = Model.from_data(problem_data)
    result = model.solve(stop=MaxRuntime(max_runtime))

    return result.best.get_routes()[0].visits()
