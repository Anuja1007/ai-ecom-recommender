# ai-ecom-recommender
_**AI Product Recommender: Full-Stack MLOps Demo**_

This project is a multi-disciplinary application demonstrating the end-to-end implementation of a machine learning model deployed into a production web service. It validates proficiency across Software Engineering, AI/ML, Full-Stack Development, and DevOps principles.
The system allows users to receive personalized product recommendations based on collaborative filtering logic.


**Key Features and Technical Achievements**

This project showcases a complete professional workflow, emphasizing quality and deployment automation.
1. Full-Stack ML Deployment & Quality Assurance
API & Model Service: Engineered a high-performance FastAPI backend to deploy a trained Scikit-learn K-NN model (collaborative filtering) using model persistence (.pkl).
Testing & Resilience: Implemented comprehensive Pytest unit tests to validate the prediction logic and API functionality. Confirmed E2E functionality and robust 404/CORS error handling.
Frontend UI: Built a dynamic, functional React interface (Vite) that securely consumes and displays the real-time recommendations from the deployed API.
2. Advanced DevOps & Automation
Containerization: Created an optimized, multi-stage Dockerfile to package the API. Implemented the security best practice of running the service as a non-root user to minimize the attack surface.
CI/CD Pipeline: Established a professional Continuous Integration/Continuous Deployment (CI/CD) workflow using GitHub Actions. This automatically builds the Docker image and pushes the application to the cloud upon commit.
Cloud Deployment: Deployed the API to the Render Free Tier, proving expertise in leveraging serverless/container-based cloud services for cost-optimization and high availability.


**Tech Stack:-**

Python, Pandas, Scikit-learn, SciPy (CSR Matrix), Pickle
FastAPI (Python), Uvicorn
React, Vite, JavaScript
Docker, GitHub Actions, Render (Free Tier)
