# Config reverse proxy with Nginx where Nginx manages the SSL certificates

* Install Nginx

* Install RPM/DEB Rundeck version 

* Create certificate 

Example: 

#openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.crt


## Nginx side settings 
/etc/nginx/nginx.conf

```
server {
    listen 443;
    server_name hostname;
    ssl_certificate           /etc/nginx/cert.crt;
    ssl_certificate_key       /etc/nginx/cert.key;
    ssl on;
    access_log            /var/log/nginx/rdeck.access.log;


location / {
proxy_pass http://hostname:4440;
     }

  }
}
```
## Rundeck side settings 
* Include the following line in "RDECK_JVM" of the file /etc/sysconfig/rundeckd 

-Drundeck.jetty.connector.forwarded=true

* Edit the /etc/rundeck/rundeck-config.properties file

grails.serverURL=https://hostname

* Edit the /etc/rundeck/framework.properties file

framework.server.url = http://hostname:4440

framework.rundeck.url = https://hostname



## Open Firewall 
* RH/Centos

#firewall-cmd --permanent --add-service=http

#firewall-cmd --permanent --add-service=https


* Debian/Ubuntu

#sudo ufw status

#sudo ufw allow 'Nginx Full'

* Restart Rundeck and nginx service 

#service rundeckd restart

#service nginx restart
