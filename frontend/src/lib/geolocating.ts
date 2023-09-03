
import { Valhalla } from "@routingjs/valhalla";
import type { Coordinates, DistanceMatrix } from "./interfaces";


export async function geolocate(address: string): Promise<Coordinates | null> {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    if (data.length === 0) {
        return null;
    }
    return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
    };
}

export async function computeDistanceMatrix(locations: Coordinates[]): Promise<DistanceMatrix> {
    const valhalla = new Valhalla();
    const location_array = locations.map(location => [location.lat, location.lng]) as [number, number][];
    const matrix = await valhalla.matrix(location_array, "auto").then(
        (response) => {
            // make sure that all distances and durations are defined, else return null
            if (response.distances.filter(row => row.filter(distance => distance == null).length > 0).length > 0) {
                throw new Error("Distance matrix contains undefined values");
            }
            if (response.durations.filter(row => row.filter(duration => duration == null).length > 0).length > 0) {
                throw new Error("Duration matrix contains undefined values");
            }

            return {
                distances: response.distances,
                durations: response.durations
            }
        }
    )

    return matrix as DistanceMatrix;
}
