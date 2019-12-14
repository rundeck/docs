# Upgrading to Rundeck 3.2



::: tip
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.0 or earlier.
:::

## Upgrading from Rundeck 3.0 Using Debian packaging


The value of `framework.projects.dir` in the default install of Rundeck 3.2 in the config file `framework.properties` has changed to:

	framework.projects.dir=/var/lib/rundeck/projects

Rundeck 3.0.x has this :

	framework.projects.dir=/var/rundeck/projects


If before the upgrade the `/var/rundeck/projects` is NOT empty, 3.2 will start properly, but if `/var/rundeck/projects` is empty, it will be deleted and 3.2 won't start until you modify the proper line in `framework.properties` to be `/var/lib/rundeck/projects`.

An error like this may occur in the Rundeck console:

```
[2019-12-13 12:36:41.755]  WARN AnnotationConfigEmbeddedWebApplicationContext --- [           main] Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'requestMappingHandlerMapping' defined in org.springframework.web.servlet.config.annotation.DelegatingWebMvcConfiguration: Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'grailsInterceptorMappedInterceptor': Cannot create inner bean '(inner bean)#449f9628' of type [org.grails.plugins.web.interceptors.GrailsInterceptorHandlerInterceptorAdapter] while setting constructor argument; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name '(inner bean)#449f9628': Unsatisfied dependency expressed through method 'setInterceptors' parameter 0; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'pluginsCtlInterceptor': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'uiPluginService': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'pluginService': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'frameworkService': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'authorizationService': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'configStorageService': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'rundeckConfigStorageTreeFactory': Cannot resolve reference to bean 'storagePluginProviderService' while setting bean property 'storagePluginProviderService'; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'storagePluginProviderService': Cannot resolve reference to bean 'rundeckFramework' while setting constructor argument; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'frameworkFactory': Cannot resolve reference to bean 'frameworkFilesystem' while setting bean property 'frameworkFilesystem'; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'frameworkFilesystem': Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [com.dtolabs.rundeck.core.common.FilesystemFramework]: Factory method 'createFilesystemFramework' threw exception; nested exception is java.lang.IllegalArgumentException: project base directory could not be created. /var/rundeck/projects
[2019-12-13 12:36:41.796] ERROR SpringApplication --- [           main] Application startup failed
```
