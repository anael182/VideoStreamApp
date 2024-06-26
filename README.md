# Video Streaming Platform

Welcome to our video streaming platform project! This project is designed to demonstrate and test the capabilities of several cutting-edge technologies in a cohesive environment. Our goal is to create a robust video streaming service.

## Technologies Used

This project integrates several technologies:

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **React**: A JavaScript library for building user interfaces, particularly single-page applications where you need fast, interactive user experiences.
- **Keycloak**: An open-source Identity and Access Management solution aimed at modern applications and services.
- **Docker**: A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.

## Project Goals

The main objective of this project is to create a video streaming platform where users can:

- Stream videos efficiently and securely.
- Manage access and user authentication using Keycloak.
- Utilize Docker for easy deployment and scaling.

## Getting Started

To get started with this project, follow these steps:

First of all, you need to have a [MongoDB](https://www.mongodb.com/) service exposed on port 27017.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anael182/VideoStreamApp.git
   ```

2. **Install libraries**:

   ```bash
   #Backend lib
   cd backend
   npm install
   #Back to root project folder
   cd ..
   #Frontend lib
   cd frontend
   npm install
   ```

3. **Start backend and frontend**:

   ```bash
   #From root directory
   npm start
   ```

   ```bash
   #You could easily start backend and frontend separatly using:

   npm run start:backend
   npm run start:frontend
   ```

4. **❤️ Application is available on your machine ❤️**

The application should be running at this adress : <http://localhost:5173/>
