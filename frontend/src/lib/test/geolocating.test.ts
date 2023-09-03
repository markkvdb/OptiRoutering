import { describe, expect, it } from 'vitest';
import { computeDistanceMatrix, geolocate } from '../geolocating';

describe('geolocate', () => {
    it('finds a location for a valid address', () => {
        expect(geolocate("Karl-Liebknecht-Straße 5, 10178 Berlin")).resolves.toEqual({
            lat: 52.5200292,
            lng: 13.403686
        });
    });

    it('returns null for an invalid address', () => {
        expect(geolocate("this doesn't exist")).resolves.toEqual(null);
    });
});

describe('computeDistanceMatrix', () => {
    it('computes the distance matrix for a set of locations', () => {
        expect(computeDistanceMatrix([
            { lat: 52.5200292, lng: 13.403686 },
            { lat: 52.5200292, lng: 13.403686 },
            { lat: 52.5200292, lng: 13.403686 },
        ])).resolves.toEqual(
            {
                distances: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                durations: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
            }
        );
    });
});
