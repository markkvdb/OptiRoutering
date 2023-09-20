# Build stage
FROM python:3.11 as requirements-stage

WORKDIR /tmp

RUN pip install poetry==1.5.1

COPY ./pyproject.toml ./poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# Run stage
FROM python:3.11

# Set environment
WORKDIR /code

# Copy requirements from build stage
COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt

# Upgrade packages that need an update
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application
COPY ./app /code/app

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]

