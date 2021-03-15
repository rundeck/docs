# Running Docker Images

Full usage information can be found on the [Docker configuration page](/administration/configuration/docker.md).

:::warning
It's not advisable to deploy images to production directly from a public repository, such as Dockerhub.
Build a derived image and store in your private repository instead.
:::

:::tip
See the [Docker Configuration Reference](/administration/configuration/docker.md) for
the full set of configuration options.
:::

## Open Source Rundeck

[rundeck/rundeck:{{{rundeckVersion}}}](https://hub.docker.com/r/rundeck/rundeck/)

```sh
docker run --name some-rundeck -p 4440:4440 -v data:/home/rundeck/server/data rundeck/rundeck:{{{rundeckVersion}}}
```

## Rundeck Enterprise

[rundeckpro/enterprise:{{{rundeckVersion}}}](https://hub.docker.com/r/rundeckpro/enterprise/)
The following example invocation will require an accessible MySQL instance
with a database, user, and the required privileges setup:

```sh
docker run \
    --name some-rundeck \
    -v data:/home/rundeck/server/data \
    -e RUNDECK_DATABASE_DRIVER=org.mariadb.jdbc.Driver \
    -e RUNDECK_DATABASE_USERNAME="${DB_USERNAME}" \
    -e RUNDECK_DATABASE_PASSWORD="${DB_PASSWORD}" \
    -e RUNDECK_DATABASE_URL="${DB_URL}" \
    rundeckpro/enterprise:{{{rundeckVersion}}}
```

## Example Configurations

The [Rundeck Docker Zoo](https://github.com/rundeck/docker-zoo)
has many docker compose example projects. Check it out for use as a quick config reference and starting templates!

- [Basic quick-start with persistent storage](https://github.com/rundeck/docker-zoo/tree/master/basic)
- [Mysql database backend](https://github.com/rundeck/docker-zoo/tree/master/mysql)
- [Oracle database backend](https://github.com/rundeck/docker-zoo/tree/master/oracle)
- [LDAP configuration](https://github.com/rundeck/docker-zoo/tree/master/ldap)
- [Cloud deployment example](https://github.com/rundeck/docker-zoo/tree/master/cloud)
- And more!
