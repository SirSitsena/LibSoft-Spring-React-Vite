# LibSoft-Spring-React-Vite

# To start the Application

- Make sure you have Node.js installed on your machine.
- You can download it from the official website: https://nodejs.org/en/download/

- Open a terminal window and navigate to the `/frontend`.
- Install the required Node.js packages by running the following command:
```
npm install
```
- Build the React frontend by running the following command:
```
npm run build
```
- Start the Spring backend by running the following command in the root application:
```
./mvnw spring-boot:run
```
- This command will start the Spring server on port 8080.

- Start the Vite development server for the React frontend by running the following command:
```
npm run dev
```
- Open your web browser and navigate to http://localhost:8081 to see your application running.

# Database

- If you started the db in RAM, then to be able to access it you will need the h2-console.
- After running the Spring application check the `src/main/resources/application.properties`.
