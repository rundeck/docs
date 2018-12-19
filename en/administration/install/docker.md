% Running Docker Images

Full usage information can be found on the Docker Hub image pages.

## Open Source Rundeck
[rundeck/rundeck:${VERSION}](https://hub.docker.com/r/rundeck/rundeck/)

```bash
docker run --name some-rundeck -v data:/home/rundeck/server/data rundeck/rundeck:${VERSION}
```

## Rundeck Pro
[rundeckpro/team:${VERSION}](https://hub.docker.com/r/rundeckpro/team/)
```bash
docker run --name some-rundeck -v data:/home/rundeck/server/data rundeckpro/team:${VERSION}
```
[rundeckpro/enterprise:${VERSION}](https://hub.docker.com/r/rundeckpro/enterprise/)  
The following example invocation will require an accessible MySQL instance
with a database, user, and the required privileges setup:
```bash
docker run \
    --name some-rundeck \
    -v data:/home/rundeck/server/data \
    -e RUNDECK_DATABASE_DRIVER=com.mysql.jdbc.Driver
    -e RUNDECK_DATABASE_USERNAME="${DB_USERNAME}"
    -e RUNDECK_DATABASE_PASSWPRD="${DB_PASSWORD}"
    -e RUNDECK_DATABASE_URL="${DB_URL}"
    rundeckpro/enterprise:${VERSION}
```


## Example Configurations
The [Rundeck Docker Zoo](https://github.com/rundeck/docker-zoo)
has many docker compose example projects. Check it out for use as a quick config reference and starting templates!

* [Basic quick-start with persistent storage](https://github.com/rundeck/docker-zoo/tree/master/basic)
* [Mysql database backend](https://github.com/rundeck/docker-zoo/tree/master/mysql)
* [Oracle database backend](https://github.com/rundeck/docker-zoo/tree/master/oracle)
* [LDAP configuration](https://github.com/rundeck/docker-zoo/tree/master/ldap)
* [Cloud deployment example](https://github.com/rundeck/docker-zoo/tree/master/cloud)
* And more!
