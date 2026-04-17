# ExampleReactiveLibraries
Simple Front-end samples of consuming a REST service, 
- Angular 
- Angular with NgRX
- Angular with NgXS

Each can be started with (one at the time):
```
npm start
```
CTRL+C to stop the front-end server.
The front-end will run on http://localhost:4200

**please note**: 
- Backend needs to be running, before starting the front-end.
- Use the npm start method, and not ng serve as the npm starter will setup the proxy to the api backend.

#### Requirements for running front-end:
- Node 20 LTS or higher.

## Backend
This angular samples needs a backend and I have included two versions, both are Spring Boot applications written in Kotlin.
One is a generic implementation and one is a (web)flux version.
They can be started with:
```
mvn spring-boot:run
```
CTRL+C to stop the backend server.

**please note**: Only start one at the time, they are both using port 8080.

#### Requirements for running backend:
- Java 21 or higher
- Maven 3.5 or higher