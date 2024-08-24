
# Zupay Assignment

This project basically contains two parts 
 - client - vite, React.js, Typescript, tailwindCss, Shadcn\Ui, Zustand.
 - backend - Json-web-token, Node.js, Express.js, MongoDB, Bcrypt.





## Documentation

[Click Here for API Docs](https://documenter.getpostman.com/view/25130819/2sAXjF8uWS)

For runnig Backend

 `cd ./backend `
 
 Install all the dependencies using `npm install`

 to run server `node index.js` or `nodemon index.js`

 For running client

 `cd ./client`
 
 Install all the dependencies using `npm install`
 
To run the app `npm run dev`


## Tech Stack

**Client:** React, Vite, Typescript, ShadCn\Ui, Zustand, TailwindCSS

**Server:** Node, Express, MongoDB, Json-Web-Token, Bcrypt.


## Run Locally

Clone the project

```bash
  git clone https://github.com/shriyapurwar15/zupay-assignment
```

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the application

```bash
  npm run dev
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
in both backend and client directories

Backend

`MONGO_URL`

`PORT`

`SALT_ROUNDS`

`SECRET`

Client

`VITE_APP_BACKEND_URL = http://localhost:<backend-port>/api/v1`
