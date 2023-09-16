import pytest

from app.models import Coordinates, Customer, Location, RouteDefinition


@pytest.fixture
def simple_route_definition() -> RouteDefinition:
    """Simple route definition."""
    return RouteDefinition(
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
            )
        ],
        maximum_capacity=None,
        time_windows=False
    )
