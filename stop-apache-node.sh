#stop apache
sudo systemctl stop httpd

#stop node
sudo kill $(sudo lsof -t -i:3001)

