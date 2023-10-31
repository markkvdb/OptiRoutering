/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/solve": {
    /**
     * Solve
     * @description Solve and return order of customers to visit.
     */
    post: operations["solve_solve_post"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** Coordinates */
    Coordinates: {
      /** Lat */
      lat: number;
      /** Lng */
      lng: number;
    };
    /** Customer */
    Customer: {
      /** Name */
      name: string;
      location: components["schemas"]["Location"];
      /** Demand */
      demand?: number | null;
      /** Earliest Time */
      earliest_time?: string | null;
      /** Latest Time */
      latest_time?: string | null;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** Location */
    Location: {
      /** Address */
      address: string;
      coordinates: components["schemas"]["Coordinates"];
    };
    /** RouteDefinitionRequest */
    RouteDefinitionRequest: {
      depot: components["schemas"]["Location"];
      /** Customers */
      customers: components["schemas"]["Customer"][];
      /** Maximum Capacity */
      maximum_capacity?: number | null;
      /**
       * Time Windows
       * @default false
       */
      time_windows?: boolean;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /**
   * Solve
   * @description Solve and return order of customers to visit.
   */
  solve_solve_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RouteDefinitionRequest"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": number[];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
