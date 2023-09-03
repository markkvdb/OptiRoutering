// Type definitions for the data structures used in the application

export interface Location {
    lat: number;
    lng: number;
}

export interface Depot {
    address: string;
    location: Location | null | undefined;
}

export interface Customer {
    address: string;
    location: Location | null | undefined;
    demand: number | undefined;
    earliest_time: Date | undefined;
    latest_time: Date | undefined;
}

export interface RouteDefinition {
    depot: Depot;
    customers: Customer[];
    maximum_capacity: number | null;
    time_windows: boolean;
}

export interface DistanceMatrix {
    distances: number[][];
    durations: number[][];
}
