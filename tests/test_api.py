# /tests/test_api.py

from starlette.testclient import TestClient
import pytest
from src.api.main import app 
# Note: Remove the old 'client = TestClient(app)' if it was outside a function

# Define a fixture to ensure the TestClient is created correctly for every test
@pytest.fixture(scope="module")
def client():
    # Use the TestClient context manager
    with TestClient(app) as c:
        yield c

# Modify all test functions to accept the 'client' fixture argument:

# 1. Test 1: Health Check
def test_health_check(client): # <-- ADD client ARGUMENT
    response = client.get("/health") 
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["model_loaded"] is True 

# 2. Test 2: Recommendation
def test_successful_recommendation(client): # <-- ADD client ARGUMENT
    response = client.get("/recommend/1?n_recommendations=3")

    assert response.status_code == 200
    assert len(response.json()) == 3
    assert all(isinstance(item, int) for item in response.json())
    
# 3. Test 3: Error Handling
def test_user_not_found(client): # <-- ADD client ARGUMENT
    response = client.get("/recommend/999999")

    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()