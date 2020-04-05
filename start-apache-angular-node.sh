# start apache
sudo systemctl start httpd

# start the angular app
cd ~/GroceryApp/client
npm start &

# start the node app
cd ~/GroceryApp/server
node app.js &

