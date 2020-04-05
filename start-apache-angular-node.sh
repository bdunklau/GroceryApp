# restart apache
~/GroceryApp/restartapache.sh

# start the angular app
cd ~/GroceryApp/client
npm start &

# start the node app
cd ~/GroceryApp/server
node app.js &

