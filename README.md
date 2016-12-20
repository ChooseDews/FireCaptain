
<p align="center">
  <img src="/public/images/CaptainLogo.png" width="650px" alt="Sublime's custom image"/>
</p>




## Client
To install client dependencies go to the client folder and run:

    npm install
To start the production server run:

    npm start
Other available commands:

| Command       | Function                                                  |
|---------------|-----------------------------------------------------------|
| npm start     | Starts the production server.                             |
| npm run dev   | Starts the development server.                            |
| npm run prod  | Starts the production server without cleaning or building |
| npm run clean | Deletes all the compiled webpack files.                   |
| npm run build | Builds the compiled javascript and html files.            |

## Server


#### Install

Required External Dependencies
- MongoDb
- Redis
- Node => V7

After all external dependencies have been configured in ```server/bin/config.js``` run ```npm install``` within ```server/``` directory to install all the node modules.

#### Runtime

Run ```npm start``` or ```nodemon``` in the ```server/``` directory. Then visit https://localhost:3000

