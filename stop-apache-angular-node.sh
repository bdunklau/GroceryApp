#stop apache
sudo systemctl stop httpd

#stop angular
sudo kill $(sudo lsof -t -i:4200)

#stop node
sudo kill $(sudo lsof -t -i:3000)

