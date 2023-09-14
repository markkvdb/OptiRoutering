"""Entrypoint to the web application."""

from datetime import time
from uuid import uuid4

from fastapi import FastAPI
from pydantic import BaseModel


class Coordinates(BaseModel):
    lat: float
    lng: float

class Location(BaseModel):
    address: str
    coordinates: Coordinates

class Customer(BaseModel):
    name: str
    location: Location
    demand: int | None = None
    earliest_start: time | None = None
    latest_end: time | None = None

class BaseRouteDefinition(BaseModel):
    depot: Location
    customers: list[Customer]
    maximum_capacity: int | None = None
    time_windows: bool = False

class RouteDefinitionRequest(BaseRouteDefinition):
    pass

class RouteDefinition(BaseRouteDefinition):
    id: str

app = FastAPI()

route_definitions: dict[str, RouteDefinition] = {}


@app.post("/routes")
async def route(route_request: RouteDefinitionRequest) -> RouteDefinition:
    """Calculate the optimal route for the given route definition."""
    route_definition = RouteDefinition(
        id=uuid4().hex,
        **route_request.dict()
    )
    route_definitions[route_definition.id] = route_definition

    return route_definition

@app.get("/routes/{id}")
async def route(id: str) -> RouteDefinition:
    """Get the route definition for the given route id."""
    return route_definitions[id]


@app.get("/routes")
async def routes() -> list[RouteDefinition]:
    """Get all route definitions."""
    return list(route_definitions.values())
