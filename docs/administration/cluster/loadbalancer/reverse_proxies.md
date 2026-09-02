# Reverse Proxies

## How to Configure Rundeck Behind a Reverse Proxy Server

Rundeck works using its own web server, the Jetty web server. This web server runs over the 4440 TCP port by default (or 4443 under SSL config).

It's useful to delegate the web traffic using a web server for a variety of reasons including, hiding the existence and characteristics of the origin instance, optimizing content by compressing it to reduce the load time, providing load balancing, SSL offloading, and avoiding direct access to the instance (only the proxy need to be exposed).

This guide will show how to configure Rundeck behind NGINX and Apache httpd web servers in a reverse proxy configuration.

The examples below distinguish two different names:

- **Public hostname** — the externally-facing name that users and API clients put in a browser or in their `RD_URL`, for example `rundeck.example.com`. This is what the reverse proxy listens on.
- **Internal hostname** — the address of the Rundeck server(s) itself, for example `rundeck-server-1.internal.example.com:4440`. This is what the reverse proxy forwards traffic to. In a clustered deployment there may be several of these behind a load balancer.

The reverse proxy is typically not running on the Rundeck server itself, so avoid using `localhost` for both sides of the configuration — it makes it impossible to tell which value refers to the public side and which refers to the internal Rundeck instance.

## Rundeck Default Configuration

The first step is to install Rundeck, the process is described [here](/administration/install/index.md), and make sure that the Rundeck service is running.

By default Rundeck listens on the `4440` port on the Rundeck server's own hostname (here, `rundeck-server-1.internal.example.com`). The reverse proxy takes requests to the public hostname and forwards them to that internal address:

1. Change the `grails.serverURL=http://rundeck-server-1.internal.example.com:4440` parameter to `grails.serverURL=https://rundeck.example.com` (the proxy server's public URL for the Rundeck instance) in the `rundeck-config.properties` file (at `/etc/rundeck/` path).
2. Replace `framework.server.url = http://rundeck-server-1.internal.example.com:4440` with `framework.server.url = https://rundeck.example.com`

## NGINX Configuration

NGINX needs to take requests for the public hostname and forward ("reverse proxy") them to the internal Rundeck server location. The following config could be added to the `nginx.conf` file:

```nginx
server {
  listen 80;
  server_name rundeck.example.com;

  location / {
    proxy_pass http://rundeck-server-1.internal.example.com:4440;
    proxy_set_header X-Forwarded-Host $host:$server_port;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

Then start the Rundeck and NGINX services. The Rundeck instance should be available at `http://rundeck.example.com` instead of `http://rundeck-server-1.internal.example.com:4440`.

### NGINX Docker Test Environment

Docker is a good platform to test these concepts quickly, here is an example using the official Rundeck image and NGINX image. Because this environment runs entirely on your own machine, the public side is reached through `localhost` rather than a real DNS name, while the `rundeck` service name (resolved by Docker's internal network) plays the role of the internal hostname.

`docker-compose.yaml` file content:

```yaml
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

```nginx
server {
  listen 80 default_server;
  server_name rundeck-cl;

  # default rundeck location is the root URL
  location / {
    # and this is the default rundeck location from
    # the rundeck container, addressed by its Docker service name
    proxy_pass http://rundeck:4440;
  }
}
```

To run just type `docker-compose up`, then access `http://localhost` in any modern web browser.

## Apache httpd Configuration

It's possible to do the same configuration on the Apache httpd web server. Start by including the following configuration (in the `rundeck.conf` file) at the `/etc/httpd/conf.d/` directory.

```apache
CustomLog /var/log/httpd/access_log combined

# custom log for rundeck service
ErrorLog /var/log/httpd/proxy/rundeck/error_log
CustomLog /var/log/httpd/proxy/rundeck/access_log combined

# reverse proxy config
ProxyPass / http://rundeck-server-1.internal.example.com:4440/
ProxyPassReverse / http://rundeck-server-1.internal.example.com:4440/
ProxyRequests Off

# Local reverse proxy authorization override
<Proxy http://rundeck-server-1.internal.example.com:4440>
Order deny,allow
Allow from all
</Proxy>
```

It's a good idea to create a log directory for this config (as `root` user):

```bash
mkdir -p /var/log/httpd/proxy/rundeck
```

Then start the Rundeck and Apache services. Requests to `rundeck.example.com` on port 80 are proxied through to the internal Rundeck server on port 4440.

### Apache httpd Docker Test Environment

Using the default Apache httpd docker image it's possible to illustrate how the reverse proxy works on this web server. As with the NGINX example above, this local test setup uses `localhost` for the public side and the `rundeck` Docker service name for the internal side.

`docker-compose.yaml` definition:

```yaml
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

`httpd.conf` file (inside `conf/` directory) basically is to add the proxy config to main `httpd.conf` default config file:

```apache
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

To run just type `docker-compose up` and then access `http://localhost` in any modern web browser.

## Cloudflare Note

On Cloudflare proxy configuration it is important to set these custom rules to get Rundeck working:

```text
Polish: Off, Auto Minify: Off, Cache Level: Bypass, Origin Cache Control: On, Disable Performance
```
