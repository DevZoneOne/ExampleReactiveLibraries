# ExampleReactiveLibraries
Simple examples of different Front-end choices with reactive state management consuming a REST service, 
- Angular 
- Angular with NgRX
- Angular with NgXS
- React (Vite)

Each FE can be started with (one at a time):
```
npm start
```
CTRL+C to stop the front-end server.
Angular front-ends run on http://localhost:4200; the React app runs on http://localhost:3000

**please note**: 
- One of the backend examples needs to be running before starting the front-end.
- Use the npm start method, and not ng serve, as the npm starter will set up the proxy to the api backend.

#### Requirements for running front-end:
- Node 20 LTS or higher.

## Backend
These Angular samples need a backend, and I have included two versions; both are Spring Boot applications written in Kotlin.
One is a generic implementation, and one is a (web)flux version.
They can be started with:
```
mvn spring-boot:run
```
CTRL+C to stop the backend server.

** Please note**: Only start one at a time; they are both using port 8080.

#### Requirements for running backend:
- Java 21 or higher
- Maven 3.5 or higher

## Disclaimer
All of the samples (FE and BE) don't have any form of (unit) tests. Of course, for any project, this would be a bad practice
and we don't recommend this project as a model for new projects. We are just giving a as basic as possible sample of different
solutions for easy comparision and inspiration purposes only.
