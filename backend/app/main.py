"""Entrypoint to the web application."""

from datetime import time

from fastapi import FastAPI, HTTPException
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
    earliest_time: time | None = None
    latest_time: time | None = None

class BaseRouteDefinition(BaseModel):
    depot: Location
    customers: list[Customer]
    maximum_capacity: int | None = None
    time_windows: bool = False

class RouteDefinitionRequest(BaseRouteDefinition):
    pass

class RouteDefinition(BaseRouteDefinition):
    id: int

app = FastAPI()

route_definitions: dict[int, RouteDefinition] = {
    0: RouteDefinition(
        id=0,
        depot=Location(
            address="Hauptstraße 1, 01067 Dresden",
            coordinates=Coordinates(
                lat=51.049328,
                lng=13.738143
            )
        ),
        customers=[
            Customer(
                name="Kunde 1",
                location=Location(
                    address="Hauptstraße 2, 01067 Dresden",
                    coordinates=Coordinates(
                        lat=52.049328,
                        lng=13.738143
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
