# DSO101: Continuous Integration and Continuous Deployment FINAL PROJECT

## Project Requirement

- Add a BMI calculator service to an existing PERN (PostgreSQL, Express, React, Node) stack application

- Configure Docker to handle this new service

- Set up Jenkins for automated pushes to GitHub

- Implement GitHub Actions for Docker builds

- Deploy to Render cloud platform

## Repository Setup
### Getting the Project Code

1. Fork the repository:

- Go to 

```sh
https://github.com/Darshansgit/DSO101_SE_project.git
```

- Click "Fork" in the top right to create your own copy

2. Clone your forked repository:

```sh
git clone https://github.com/YOUR-USERNAME/DSO101_SE_project.git
cd DSO101_SE_project
```
### Setting the BMI Calculator 

Backend
Created a postgres database in render.com.

![alt text](image/1.png)

Created a .env

```sh
DATABASE_HOST=dpg-d19auvqli9vc739rd9l0-a.singapore-postgres.render.com
DATABASE_PORT=5432
DATABASE_USER=tandin_user
DATABASE_PASSWORD=wka6GCqaJuEGfL60wMGLNRU6KcYgsK2T
DATABASE_NAME=tandin
```
Run the backend server:

```sh
npm start
```
Frontend

```sh
cd frontend
npm install

npm start
```
![alt text](image/2.png)

Edit App.tsx file 

![alt text](image/3.png)

Database setup

```sh
CREATE TABLE bmi_records (
    id SERIAL PRIMARY KEY,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 120),
    height DECIMAL(5, 2) NOT NULL CHECK (height > 0 AND height < 300),
    weight DECIMAL(5, 2) NOT NULL CHECK (weight > 0 AND weight < 500),
    bmi_value DECIMAL(5, 2),
    bmi_category VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
```

Stage 1: Docker Configuration

![alt text](image/4.png)

Stage 2: Jenkins Setup 

Create Jenkins pipeline
![alt text](image/4.png)

Create Jenkinsfile on our Project Root
![alt text](image/5.png)

![alt text](image/6.png)

![alt text](image/7.png)

Stage 3: GitHub Actions

Set Up the Docker Hub Credentials in GitHub Secrets
![alt text](image/8.png)

Create GitHub Actions Workflow

![alt text](image/9.png)

Verifying Pipeline on github's action and docker hub

![alt text](image/10.png)

![alt text](image/11.png)

Stage 3: Deploy to Render

Backend
![alt text](image/12.png)

Frontend
![alt text](image/13.png)


## Conclusion

# Conclusion

In this project, we get to know how to:
1. Extended a PERN Stack Application

    - Implemented a BMI calculator feature

    - Integrated frontend (React), backend (Express/Node), and database (PostgreSQL) components

    - Developed proper database schema with validation constraints

2. Containerized the Application

    - Configured Docker for multi-service architecture

    - Set up Docker volumes for persistent data storage

    - Managed container orchestration with Docker Compose

3. Implemented CI/CD Pipelines

    - Established Jenkins automation for GitHub push triggers

    - Created GitHub Actions workflows for automated Docker builds

    - Configured proper credential management for both platforms

4. Deployed to Cloud Infrastructure

    - Managed PostgreSQL database on Render

    - Deployed containerized backend and frontend services

    - Configured environment variables and service dependencies

5. Verified Full Pipeline Functionality

    - Tested end-to-end workflow from local development to production

    - Documented all steps with screenshots and configuration details

    - Troubleshot and resolved deployment challenges
