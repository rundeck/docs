% Running Docker Images

> !!NOTICE!!: The docker images are currently incubating; they are unstable and unsupported.
Full usage information can be found on the Docker Hub image pages.

## [Open Source Rundeck](https://hub.docker.com/r/rundeck/rundeck/)
### `rundeck/rundeck:SNAPSHOT`

```
docker run --name some-rundeck -v data:/home/rundeck/server/data rundeck/rundeck:SNAPSHOT
```

## [Rundeck Pro](https://hub.docker.com/r/rundeckpro)
### `rundeckpro/cluster:SNAPSHOT`
### `rundeckpro/team:SNAPSHOT`
### `rundeckpro/dr:SNAPSHOT`

```
docker run --name some-rundeck -v data:/home/rundeck/server/data rundeckpro/cluster:SNAPSHOT
```

## [Example Configurations](https://github.com/rundeck/docker-zoo)
The [Rundeck Docker Zoo](https://github.com/rundeck/docker-zoo)
has many docker compose example projects:

* Basic quick-start with persistent storage
* External database setup with `mysql` and `oracle`
* LDAP configuration
* Standard cloud config
* etc.

Check it out for use as a quick config reference and starting templates!