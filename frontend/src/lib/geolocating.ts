
import type { Location } from "./interfaces";


export async function geolocate(address: string): Promise<Location | null> {
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
