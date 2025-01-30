# Employee Data

## About The Project

Employee Madness is a system for managing employees, allowing users to add, remove, and update employee records.

### Key Features:

- Marking employees as present and viewing absent employees on a dedicated page.
- Assigning a favorite color to each employee, which sets their background color.
- Filtering employees by level and position, as well as sorting them by name.
- Viewing dedicated pages for employees with the most years of experience or highest salaries, showing the top X employees based on these criteria.

## Built With

- **Backend**: [Node.js](https://nodejs.org/en) (with Express.js)
- **Frontend**: [React.js](https://reactjs.org/)

---

## Screenshots

![image](https://github.com/user-attachments/assets/b13c8177-bdf3-4f3f-9fd2-f5d47793ea98)

---

## Prerequisites

Make sure you have installed:
 [Node.js](https://nodejs.org/)

---

## Start the App

## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/vite.config.js proxy settings as well.

### Runnig the code

```bash
cd ./client
npm run dev
```

And Vite will start your frontend on the 5173 port and you can visit the http://localhost:5173 on your preferred browser.
