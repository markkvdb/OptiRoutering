"""App models."""

from datetime import time

from pydantic import BaseModel


class Coordinates(BaseModel):
    lat: float
    lng: float

class Location(BaseModel):
    address: str
    coordinates: Coordinates

class Depot(Location):
    pass

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
