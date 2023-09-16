"""Test the problem data module."""

from pyvrp import Model, ProblemData
from pyvrp.stop import MaxRuntime
from routingpy import Valhalla

from app.models import RouteDefinition
from app.solver.problem_data import create_problem_data, get_distance_matrices


def test_get_distance_matrices(simple_route_definition: RouteDefinition) -> None:
    """Test that we get the distance and duration matrices."""
    distance_matrix, duration_matrix = get_distance_matrices(simple_route_definition, client=Valhalla())

    # check size
    assert distance_matrix.shape == (3, 3)
    assert duration_matrix.shape == (3, 3)

    # make sure that the elements are integers
    assert distance_matrix.dtype == int
    assert duration_matrix.dtype == int



def test_create_problem_data(simple_route_definition: RouteDefinition) -> None:
    """Test that we can create a problem data object."""
    problem_data = create_problem_data(simple_route_definition)

    assert isinstance(problem_data, ProblemData)
