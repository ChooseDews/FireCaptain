## Fire Captain Sever

This repo contains the domain logic and api. The entry point is located at ````bin/www```` however the main tieing logic is within ````app.js````. Run ````npm start```` or ````nodemon```` to get everything running.

### Services

Services are the main glue and are used for redudent operations, and overall is used to simplify the routes  layer of the application. In short services  interact with the models layer of application, and gives the tools requierd to the runtime and api applications. A file in the ````services/```` directory is automatically loaded into the ````services```` object.

### Models

Models contain all the application database objects. In this application mongoose is in use to manage interations with MongoDB database. However they do not touch any redis information. 

All Models are automatically loaded from ````db/models````. So when creating a new model it is imparative that you use the function return convention seen in other models. 

Important note on models: The ````model.name```` variable must be the non-plural term so for example ````User```` instead of ````Users````. This is because ````db/db.js```` automatically appends a ````s```` for the name kept within the database. The shortfall for this is that some words have odd plural forms so ````Cacti```` world convert into ````Cactis```` within the database.

### Routes

Routes also follow an auto injection pattern. So any route file within ````routes/```` is automatically loaded in. A route file can contain a single or multiple routes. The ````urlPath ```` variable is used to define the files entire pre-url route. So for users you may choose use ````/api/users````

