sudo fallocate -l 2G /swapfile
ls -lh /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

sudo apt-get update
sudo apt install -y curl
sudo apt install -y git
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

nvm install node
node -v
npm -v

npm install -g pm2 nodemon grunt bower better-npm-run webpack

cd ~
mkdir ./web
cd web
git clone https://3f2a4bec8c284128e4b4c45d07597a0b72c462b7:x-oauth-basic@github.com/ChooseDews/FireCaptain.git
cd FireCaptain
git checkout production
npm install --unsafe-perm

sudo apt-get update
sudo apt-get install redis-server -y
sudo service redis-server start
sudo update-rc.d redis-server enable
sudo update-rc.d redis-server defaults

cd ~/web/FireCaptain
pm2 start ./bin/deploy/CD_Server.js
npm run prod
