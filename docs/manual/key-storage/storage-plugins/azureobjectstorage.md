After commenting the key storage provider 1, like this:

#Encryption for key storage
#rundeck.storage.provider.1.type=db
#rundeck.storage.provider.1.path=keys

#rundeck.storage.converter.1.type=jasypt-encryption
#rundeck.storage.converter.1.path=keys
#rundeck.storage.converter.1.config.encryptorType=custom
#rundeck.storage.converter.1.config.password=781f81ce581ae12e
#rundeck.storage.converter.1.config.algorithm=PBEWITHSHA256AND128BITAES-CBC-BC
#rundeck.storage.converter.1.config.provider=BC

I was able to configure the AzureObjectStorage, in the same provider 1, like this:

rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.container=
rundeck.storage.provider.1.config.extraConnectionSettings=EndpointSuffix=core.windows.net
rundeck.storage.provider.1.config.accessKey=
rundeck.storage.provider.1.config.storageAccount=
rundeck.storage.provider.1.config.connectionTimeout=180
rundeck.storage.provider.1.config.defaultEndpointProtocol=https
rundeck.storage.provider.1.type=azure-repository-object-store
rundeck.storage.provider.1.removePathPrefix=true

![image](https://github.com/rundeck/docs/assets/48934140/729da0fd-b38e-4ba3-b851-72694cbbc6d9)
![image](https://github.com/rundeck/docs/assets/48934140/5575fa67-eef2-43de-a651-48b53149cbc8)
![image](https://github.com/rundeck/docs/assets/48934140/68de062c-f357-4eff-8644-5b259e99dcc1)
