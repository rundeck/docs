# Release 3.3.8

Name: <span style="color: sandybrown"><span class="glyphicon glyphicon-leaf"></span> "onion ring sandybrown leaf"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

### Secure Authentication Tokens

In an effort to enhance the security of Rundeck Authentication tokens are now stored securely and will only be displayed upon creation. Here are the highlights of this new functionality:

- New tokens created will be stored hashed, and only will be displayed once when created, either by UI or API. After creation it won't be possible to obtain tokens.
- Existing tokens will be kept as is until deleted.
- Webhook tokens will preserve the previous behavior and wont be hashed.
- For the API, all token api endpoints now require V19 or higher, as V18 and earlier behavior require to obtain the token value which is no longer possible. The only exception is the "Create Token" api endpoint which preserves its behavior.

### Jenkins Update

The Rundeck/Jenkins integration [received an update](https://plugins.jenkins.io/rundeck/#documentation) that addressed some open issues.  We've also added some Option Value and Notification plugins to the Enterprise product to supplement the updated Jenkins code:

- [Post Deployment Notification Plugin](https://docs.rundeck.com/docs/manual/notifications/jenkins.html)
- Artifacts Option Value Plugin
- Build Option Value Plugin

## Issues

### Enterprise Updates

* SSO sync can now use user info that is provided in non-OIDC standard attributes
* Enable OAuth2 client authentication method configuration (Ping SSO)
* Changes to allow use of the namespaces for HashiCorp Vault in rundeck-config.properties
* [FIXED] PyWinRM fails when using options or arguments with simple quotes
* [Property loader wasn't decrypting property value](https://github.com/rundeck/rundeck/pull/6694)

### Core Product Updates

* [Migrate auth call from frameworkService to new ACL classes in repository controller](https://github.com/rundeck/rundeck/pull/6692)
* [Update pywinrm plugin to add a function to remove/replace simple quotes when execute CMD command](https://github.com/rundeck/rundeck/pull/6689)
* [Update Ace editor to fix handling of yaml multiline string](https://github.com/rundeck/rundeck/pull/6685)
* [Allow syncing user info in pre-authenticated mode](https://github.com/rundeck/rundeck/pull/6684)
* [Package and Publish UI Trellis](https://github.com/rundeck/rundeck/pull/6681)
* [Fix NPE while cleaning up pending triggers](https://github.com/rundeck/rundeck/pull/6680)
* [Add user email to the context that is used to resolve parameters for options](https://github.com/rundeck/rundeck/pull/6677)
* [Fixing Enterprise download link that was point to Open Source version (update available notification)](https://github.com/rundeck/rundeck/pull/6667)
* [Fix execution log viewer not updating settings on running job](https://github.com/rundeck/rundeck/pull/6664)
* [Add ability to redirect login page to a different uri](https://github.com/rundeck/rundeck/pull/6663)
* [Fix an issue with notification plugin and dynamic properties](https://github.com/rundeck/rundeck/pull/6662)
* [Update Gradle to 5.6.4](https://github.com/rundeck/rundeck/pull/6659)
* [Fix/job life cycle node list](https://github.com/rundeck/rundeck/pull/6658)
* [Secure authentication tokens](https://github.com/rundeck/rundeck/pull/6643)
* [Updating node set on subworkflow state when the node filter is modified during the job execution](https://github.com/rundeck/rundeck/pull/6640)
* [NPE In JobSchedulerService](https://github.com/rundeck/rundeck/issues/6580)

 Plus many additional updates to package verisons across Enterprise and Open Source products.

## Contributors

* Alberto Hormazabal (ahormazabal)
* Greg Schueler (gschueler)
* Imad Jafir (imad6639)
* Jaime Tobar (jtobard)
* Nicole Valenzuela (nvalenzuela20)
* Greg Zapp (ProTip)
* Rodrigo Navarro (ronaveva)
* Stephen Joyner (sjrd218)
* Carlos Franco (carlosrfranco)
* Luis Toledo (ltamaster)
* Forrest Evans (fdevans)

## Bug Reporters

* ProTip
* ahormazabal
* carlosrfranco
* gschueler
* imad6639
* ltamaster
* nvalenzuela20
* ronaveva
* sjrd218

:::danger Remember!!
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver is no longer be
bundled with the distributions. See the [Upgrade Guide](/upgrading/upgrading-to-rundeck-3.3.4.md)
for instructions to ensure your Rundeck installation can still connect to MySQL after upgrading.
:::
