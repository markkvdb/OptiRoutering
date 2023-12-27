# OptiRoutering

OptiRoutering is a web application that allows you to plan your route in the most optimal way. (Optimal) routes are calculated using the open source [PyVRP](https://pyvrp.org/) solver. The front-end is delivered using Svelte and the back-end is written in Python using FastAPI.

The OptiRoutering web application is available at https://optiroutering.mvanderbroek.com to serve as a real proof of concept. Another goal of this project is to learn more about Svelte and FastAPI and how to combine them into a single application. It includes:

- Passwordless authentication using Auth.js;
- A simple database using SQLite via the Drizzle ORM;
- Automatic openAPI client SDK generation for the front-end;
- Form validation using superforms.

## Development

Start the back-end and front-end server using docker compose with

```bash
docker compose up -d
```

and browse to http://localhost:3000 to open the web application.
