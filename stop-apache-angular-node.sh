#stop apache
sudo systemctl stop httpd

#stop angular
sudo kill $(sudo lsof -t -i:4201)

#stop node
sudo kill $(sudo lsof -t -i:3001)

