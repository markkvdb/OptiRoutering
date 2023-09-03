// Type definitions for the data structures used in the application

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Location {
    address: string;
    coordinates: Coordinates | null | undefined;
}

export interface Customer {
    name: string;
    location: Location;
    demand: number | undefined;
    earliest_time: Date | undefined;
    latest_time: Date | undefined;
}

export interface RouteDefinition {
    depot: Location;
    customers: Customer[];
    maximum_capacity: number | null;
    time_windows: boolean;
}

export interface DistanceMatrix {
    distances: number[][];
    durations: number[][];
}
