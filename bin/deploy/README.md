

# Deploy Scripts built for Ubuntu 16.04 
### The expectation is that everything is run via a root account. However it can work via a super user.

The ```fullDeploy.sh``` script sets up everything required for a stanging enviorment (or production) from a clean ubuntu install. It doesn't however configure nginx or domain routes.

At the end of fullDeploy.sh you should be able to see the working app at ```http://IpAddress:3000```

### Running the Script

Running ```. ./fullDeploy.sh``` will do everything from your terminal window. Alternatively you can run ```sh ./fullDeploy.sh``` in a diffrent process and allow it to complete on it's own. The install proccess can take a considerable amout of time.

## Continues Deployment

Continues Deployment is another cool thing our deploy scripts can handle. The ```CD_Server.js``` manages a web server on port ```2000``` of the app to communicate with GitHub webhooks or user input.

#### Helpful URLs

* http://IpAddress:2000/ Gives the current git repo status on the server.
* http://IpAddress:2000/log Gives the current git history on the server.
* http://IpAddress:2000/update Will trigger a manual rebuild, and pull.

#### Starting CD

run ```pm2 start CD_Server.js``` and configure github webhooks to point to http://IpAddress:2000/github Presto! Whenever the production branch is updated the server will automatically reload with no downtime!
