
import numpy as np
from pyvrp import Client, ProblemData, VehicleType
from routingpy import Valhalla

from app.models import Customer, Depot, RouteDefinition


def create_problem_data(route_definition: RouteDefinition, coordinate_precision: int = 5) -> ProblemData:
    """Create the problem data for the given route definition."""
    distance_matrix, duration_matrix = get_distance_matrices(route_definition, Valhalla())
    clients = [location_to_client(route_definition.depot, coordinate_precision)] + [location_to_client(customer, coordinate_precision) for customer in route_definition.customers]

    return ProblemData(
        clients=clients,
        vehicle_types=[VehicleType(capacity=10_000, num_available=1)],
        distance_matrix=distance_matrix,
        duration_matrix=duration_matrix,
    )

def get_distance_matrices(route_definition: RouteDefinition, client: Valhalla) -> tuple[np.ndarray, np.ndarray]:
    """Get the distance matrices for the given route definition."""
    coords = [route_definition.depot.coordinates] + [customer.location.coordinates for customer in route_definition.customers]
    matrix = client.matrix(locations=[[coord.lng, coord.lat] for coord in coords], profile="auto")

    return np.array(matrix.distances), np.array(matrix.durations)

def location_to_client(location: Depot | Customer, coordinate_precision: int = 5) -> Client:
    """Convert the given location to a client."""
    if isinstance(location, Customer):
        coordinates = location.location.coordinates
    else:
        coordinates = location.coordinates

    return Client(
        x=round(coordinates.lng * coordinate_precision),
        y=round(coordinates.lat * coordinate_precision),
        tw_late=1_000_000,
        required=True,
    )
