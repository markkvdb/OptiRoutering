
import type { RouteDefinition } from "$lib/interfaces";

export const route_definitions: RouteDefinition[] = [
    {
        depot: {
            address: "Opslagstraat, Groningen, Nederland",
            coordinates: {
                lat: 53.1045,
                lng: 6.8775
            }
        },
        customers: [
            {
                name: "Klant 1",
                location: {
                    address: "Klantstraat 1, Delfzijl",
                    coordinates: {
                        lat: 53.3333,
                        lng: 6.9167
                    }
                },
                demand: undefined,
                earliest_time: undefined,
                latest_time: undefined
            },
            {
                name: "Klant 2",
                location: {
                    address: "Klantstraat 2, Delfzijl",
                    coordinates: {
                        lat: 53.3333,
                        lng: 6.9167
                    }
                },
                demand: undefined,
                earliest_time: undefined,
                latest_time: undefined
            }
        ],
        maximum_capacity: null,
        time_windows: false,
    }
]
