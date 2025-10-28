from fastapi import FastAPI
import os
# We will load the model here later, but first, the basics:

app = FastAPI(
    title="E-Commerce Recommender API",
    version="1.0.0"
)

# Note: Define global variables for model/maps to be loaded only ONCE
# knn_model = None
# item_map = None
# user_map = None



@app.get("/")
def read_root():
    return {"message": "Welcome to the Recommender API. Access /docs for endpoints."}

@app.get("/health")
def health_check():
    # A simple check to show the service is alive
    return {"status": "ok", "service": "recommendation-api", "model_loaded": False}





