cd ~/web/FireCaptain
git pull origin production
npm install
npm run build
pm2 reload all
