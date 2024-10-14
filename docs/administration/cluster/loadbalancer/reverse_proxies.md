# Reverse Proxies
## How to Configure Rundeck Behind a Reverse Proxy Server

Rundeck works using its own web server, the Jetty web server. This web server runs over the 4440 TCP port by default (or 4443 under SSL config).

It's useful to delegate the web traffic using a web server for a variety of reasons including, hiding the existence and characteristics of the origin instance, optimizing content by compressing it to reduce the load time, providing load balancing, SSL offloading, and avoiding direct access to the instance (only the proxy need to be exposed).

This guide will show how to configure Rundeck behind NGINX and Apache httpd web servers in a reverse proxy configuration.


# Rundeck Default Configuration

The first step is to install Rundeck, the process is described [here](/administration/install/index.md), and make sure that the Rundeck service is running.

By default Rundeck listens to the `4440` port on `localhost`. The main idea of the reverse proxy is that the webserver takes the default Rundeck port and redirects to the URL specified in the web server, in this example the main root domain name "localhost":



1. Change the `grails.serverURL=http://localhost:4440` parameter by `grails.serverURL=http://localhost` (the proxy server exit URL for the Rundeck instance) at `rundeck-config.properties` file (at `/etc/rundeck/` path).
2. Replace `framework.server.url = http://localhost:4440` with `framework.server.url = http://localhost`


# NGINX Configuration

NGINX needs to take the default Rundeck port and "redirects" to a defined web server location, in this case, the root (`/`) the following config could be added on the `nginx.conf` file:


```
 location / {
   proxy_pass http://localhost:4440;
   proxy_set_header X-Forwarded-Host $host:$server_port;
   proxy_set_header X-Forwarded-Server $host;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 }
```


Then start the Rundeck and NGINX services, the Rundeck instances should be available on `http://localhost` host instead of `http://localhost:4440`.


## NGINX Docker Test Environment

Docker is a good platform to test these concepts quickly, here is the example using the official Rundeck image and NGINX image.

`docker-compose.yaml` file content:


```
version: "3"
services:
 rundeck:
   image: rundeck/rundeck:SNAPSHOT
   ports:
     - 4440:4440
   environment:
     RUNDECK_GRAILS_URL: http://localhost
     RUNDECK_SERVER_FORWARDED: "true"
 nginx:
   image: nginx:alpine
   volumes:
     - ./config/nginx.conf:/etc/nginx/conf.d/default.conf:ro
   ports:
   - 80:80
```


`nginx.conf` (inside `config` folder)


```
server {
   listen 80 default_server;
   server_name rundeck-cl;

   # default rundeck location is the root URL
   location / {
       # and this is the default rundeck location from
       # rundeck container
       proxy_pass http://rundeck:4440;
    }
}
```


To run just type `docker-compose up`, then access to `http://localhost` in any modern web browser.


# Apache httpd Configuration

It’s possible to do the same configuration on Apache httpd web server. Start by including the following configuration (on the `rundeck.conf `file) at `/etc/httpd/conf.d/` directory.


```
CustomLog /var/log/httpd/access_log combined

# custom log for rundeck service
ErrorLog /var/log/httpd/proxy/rundeck/error_log
CustomLog /var/log/httpd/proxy/rundeck/access_log combined

# reverse proxy config
ProxyPass / http://localhost:4440/
ProxyPassReverse / http://localhost:4440/
ProxyRequests Off

# Local reverse proxy authorization override
<Proxy http://localhost:4440>
Order deny,allow
Allow from all
</Proxy>
```


Is a good idea to create a log directory for this config (as `root` user):


```
mkdir -p /var/log/httpd/proxy/rundeck
```


Then start the Rundeck and Apache services, Rundeck is listening to the Apache TCP port 80.


## Apache httpd Docker Test Environment

Using the default Apache httpd docker image it’s possible to illustrate how the reverse proxy works on this web server.

`docker-compose.yaml` definition:


```
version: "3"
services:
 rundeck:
   image: rundeck/rundeck:SNAPSHOT
   ports:
     - 4440:4440
   environment:
     RUNDECK_GRAILS_URL: http://localhost
     RUNDECK_SERVER_FORWARDED: "true"
 apache:
   image: httpd:latest
   volumes:
     - ./config/httpd.conf:/usr/local/apache2/conf/httpd.conf:ro
   ports:
   - 80:80
```


`Httpd.conf `file (inside `conf/` directory) basically is to add the proxy config to main `httpd.conf` default config file:


```
ServerRoot "/usr/local/apache2"
Listen 80

LoadModule mpm_event_module modules/mod_mpm_event.so
LoadModule authn_file_module modules/mod_authn_file.so
LoadModule authn_core_module modules/mod_authn_core.so
LoadModule authz_host_module modules/mod_authz_host.so
LoadModule authz_groupfile_module modules/mod_authz_groupfile.so
LoadModule authz_user_module modules/mod_authz_user.so
LoadModule authz_core_module modules/mod_authz_core.so
LoadModule access_compat_module modules/mod_access_compat.so
LoadModule auth_basic_module modules/mod_auth_basic.so
LoadModule reqtimeout_module modules/mod_reqtimeout.so
LoadModule filter_module modules/mod_filter.so
LoadModule mime_module modules/mod_mime.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule env_module modules/mod_env.so
LoadModule headers_module modules/mod_headers.so
LoadModule setenvif_module modules/mod_setenvif.so
LoadModule version_module modules/mod_version.so
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule unixd_module modules/mod_unixd.so
LoadModule status_module modules/mod_status.so
LoadModule autoindex_module modules/mod_autoindex.so
LoadModule dir_module modules/mod_dir.so
LoadModule alias_module modules/mod_alias.so

<IfModule unixd_module>
User www-data
Group www-data
</IfModule>

ServerAdmin you@example.com

<Directory />
   AllowOverride none
   Require all denied
</Directory>

DocumentRoot "/usr/local/apache2/htdocs"
<Directory "/usr/local/apache2/htdocs">
   Options Indexes FollowSymLinks
   AllowOverride None
   Require all granted
</Directory>

<IfModule dir_module>
   DirectoryIndex index.html
</IfModule>

<Files ".ht*">
   Require all denied
</Files>

ErrorLog /proc/self/fd/2

LogLevel warn

<IfModule log_config_module>
   LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
   LogFormat "%h %l %u %t \"%r\" %>s %b" common

   <IfModule logio_module>
     LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
   </IfModule>

   CustomLog /proc/self/fd/1 common
</IfModule>

<IfModule alias_module>
   ScriptAlias /cgi-bin/ "/usr/local/apache2/cgi-bin/"

</IfModule>

<IfModule cgid_module>
</IfModule>

<Directory "/usr/local/apache2/cgi-bin">
   AllowOverride None
   Options None
   Require all granted
</Directory>

<IfModule headers_module>
   RequestHeader unset Proxy early
</IfModule>

<IfModule mime_module>
   TypesConfig conf/mime.types
   AddType application/x-compress .Z
   AddType application/x-gzip .gz .tgz
</IfModule>

<IfModule proxy_html_module>
Include conf/extra/proxy-html.conf
</IfModule>

<IfModule ssl_module>
SSLRandomSeed startup builtin
SSLRandomSeed connect builtin
</IfModule>

# reverse proxy config
ProxyPass / http://rundeck:4440/
ProxyPassReverse / http://rundeck:4440/
ProxyRequests Off

# local reverse proxy authorization override
<Proxy http://rundeck:4440>
Order deny,allow
Allow from all
</Proxy>
```


To run just type `docker-compose up` and then access to `http://localhost` in any modern web browser.


# Cloudflare Note

On Cloudflare proxy configuration is important to set these custom rules to get Rundeck works:


```
Polish: Off, Auto Minify: Off, Cache Level: Bypass, Origin Cache Control: On, Disable Performance
```