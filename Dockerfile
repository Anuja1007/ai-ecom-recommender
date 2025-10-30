# Dockerfile

# --- STAGE 1: BUILD STAGE (Dependency Installation & Venv Creation) ---
# Use a lightweight, official Python image for stability.
FROM python:3.11-slim-bookworm AS builder

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_HOME=/app
WORKDIR $APP_HOME

# Copy only the requirements file first to utilize Docker's build cache
# This ensures a faster build if only source code changes, not dependencies
COPY requirement.txt .

# Create the virtual environment (/venv) and install dependencies
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
# Install all dependencies without cache to minimize image size
RUN pip install --no-cache-dir -r requirement.txt


# --- STAGE 2: PRODUCTION STAGE (The Final, Secure Image) ---
# Start from the same clean base image
FROM python:3.11-slim-bookworm

ENV APP_HOME=/app
WORKDIR $APP_HOME

# Copy the pre-built Python environment from the 'builder' stage
COPY --from=builder /venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy application source code and saved models
# The directory structure is preserved inside the container
COPY src/api/main.py src/api/
COPY src/api/knn_model.pkl src/api/
COPY src/api/item_map.pkl src/api/
COPY src/api/user_map.pkl src/api/

# --- SECURITY BEST PRACTICE (CRUCIAL FOR MNCs) ---
# 1. Create a dedicated, low-privilege system user (appuser).
RUN adduser --system --group appuser

# 2. Switch the operating user to the non-root user.
USER appuser

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the application using Uvicorn
# The command references the path inside the container
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "${PORT:-8000}"]