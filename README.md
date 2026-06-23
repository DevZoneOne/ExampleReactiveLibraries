# ExampleReactiveLibraries
Simple examples of different Front-end choices with reactive state management consuming a REST service, 
- Angular 
- Angular with NgRX
- Angular with NgXS
- React (Vite)

## Front-end

Each FE can be started with (one at a time):
```
npm start
```
- All front-ends run on VITE and on the following url: http://localhost:4200.
- Press **q + enter** to quite, or **r + enter** to do a forced browser reload.

**Please note:** 
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

**Please note**: 
- Only start one at a time
- They are both using port 8080.

#### Requirements for running backend:
- Java 21 or higher
- Maven 3.5 or higher

## Disclaimers
Occasionally, this repo will be updated to current versions of Angular, React and/or Spring-boot. At the moment you are
reading this, it may be behind and not represent correctly the best current solution. If you see upgrade or 
improvement options, a pull request is really appreciated.

All the samples (FE and BE) don't have any form of (unit) tests. Of course, for any project, this would be a bad practice,
and we don't recommend this project as a model for new projects. We are just giving "as basic as possible" samples of 
different solutions for easy comparision and inspiration purposes only.
