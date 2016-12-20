
<p align="center">
  <img src="https://i.imgur.com/oUO93jC.png" width="300px" alt="Sublime's custom image"/>
</p>

Deploy Scripts built for Ubuntu 16.04 The expectation is that everything is run via root account.
Running from the /deploy directory '''. ./fullDeploy.sh''' will install everything and start up a production instance on port 3000
If you also want auto updates with production pushes run pm2 start CD_server.js from the deploy file. Keep in mind this requires github webhooks to be pointed at address:2000/github 
