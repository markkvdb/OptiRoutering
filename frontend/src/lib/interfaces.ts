// Type definitions for the data structures used in the application

export interface Location {
    lat: number;
    lng: number;
}

export interface Customer {
    address: string;
    location: Location | null | undefined;
    demand: number | undefined;
    earliest_time: Date | undefined;
    latest_time: Date | undefined;
}
