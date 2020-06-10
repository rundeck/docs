# Preview Release 3.3.0

Name: <span style="color: peru"><span class="glyphicon glyphicon-flash"></span> "onion ring peru flash"</span>

## Overview
**Welcome to the preview release of Rundeck 3.3.0.**

This release includes a long list of feature releases for our Enterprise and Open Source versions and fixes throughout the 3.2.x series.  This preview version provided is still under development. We are hoping you have a chance to [download](https://download.rundeck.com/3.3.0/index.html) and test it, but it should **not** be used for production yet.

Here is a list of some things you can check out:
- Backend updates to Grails 4/Gradle 5 which now support Java 11.
- [Schedules](/manual/schedules/project-schedules) can be decoupled from jobs to make managing schedule changes easier.
- [Calendars](/manual/calendars) offer blackout/allowed job run dates and times.
- New User Management Wizard for local Rundeck user accounts.
- New Node Wizard for creating node entries local to Rundeck.
- An Enhanced Log Viewer loads job activity 1000% faster with improved usability options.
- Job tags to refine searching for your important jobs.
- Spring Security 5 upgrade including [OAuth2 updates](/administration/security/sso). (Be sure to read docs for the changes required)
- [HTTP Tours](/manual/tour-manager) can now be built and managed in product.

Documentation for the 3.3.x release can be [found here](https://docs.rundeck.com/3.3.x) and will be in-progress until the official release.

## How to get it
UPDATED Download!  **Preview 2** Version is now available.
Visit the [Download Site](https://download.rundeck.com/3.3.0/index.html) for the installation files.  Be sure to follow installation instructions using the [3.3.x docs](https://docs.rundeck.com/3.3.x).

A trial License for the 3.3.0 Preview period is available here.  

<!--HubSpot Call-to-Action Code --><span class="hs-cta-wrapper" id="hs-cta-wrapper-4fc2144a-6294-44d4-a54d-25f2502acad1"><span class="hs-cta-node hs-cta-4fc2144a-6294-44d4-a54d-25f2502acad1" id="hs-cta-4fc2144a-6294-44d4-a54d-25f2502acad1"><!--[if lte IE 8]><div id="hs-cta-ie-element"></div><![endif]--><a href="https://cta-redirect.hubspot.com/cta/redirect/2768099/4fc2144a-6294-44d4-a54d-25f2502acad1"  target="_blank" ><img class="hs-cta-img" id="hs-cta-img-4fc2144a-6294-44d4-a54d-25f2502acad1" style="border-width:0px;" src="https://no-cache.hubspot.com/cta/default/2768099/4fc2144a-6294-44d4-a54d-25f2502acad1.png"  alt="Download licsense file"/></a></span><script charset="utf-8" src="https://js.hscta.net/cta/current.js"></script><script type="text/javascript"> hbspt.cta.load(2768099, '4fc2144a-6294-44d4-a54d-25f2502acad1', {}); </script></span><!-- end HubSpot Call-to-Action Code_ -->

## Known Issues
If you find a bug or run into any issue you can email us at [product@rundeck.com](mailto:product@rundeck.com) or add an issue to GitHub.  Please be sure to mention that you are using the `3.3.0 Preview` version.

* Tour Manager has some outstanding bugs and a redesign coming in a future version.
  * Issue editing steps and their title.
  * Some buttons are mis-labled.
  * Step re-ordering is still under development.
* Event Viewer is still listed as beta and is still being actively developed.
* Documentation is still in progress.


## Issues

[Milestone 3.3.0](https://github.com/rundeck/rundeck/milestone/144)

* [Avoiding loading all plugins whenever a method needs to search for a plugin description](https://github.com/rundeck/rundeck/pull/6091)
* [Ability to load framework properties from the app config sources.](https://github.com/rundeck/rundeck/pull/6090)
* [Update docker to use log42.](https://github.com/rundeck/rundeck/pull/6087)
* [Fix the Japanese translation of "retry"](https://github.com/rundeck/rundeck/pull/6085)
* [Docker - Update to Ubuntu 18.04 and OpenJDK 11](https://github.com/rundeck/rundeck/pull/6083)
* [Use spring loaded instead of dev tools](https://github.com/rundeck/rundeck/pull/6080)
* [Build ui-trellis as subproject](https://github.com/rundeck/rundeck/pull/6079)
* [FileSystem Key Storage permissions ](https://github.com/rundeck/rundeck/pull/6072)
* [Fix java 11 illegal reflective access warnings](https://github.com/rundeck/rundeck/pull/6071)
* [Fix #6065 plugin values should be shown in multivalued list](https://github.com/rundeck/rundeck/pull/6066)
* [Migrate Vue build to @vue/cli](https://github.com/rundeck/rundeck/pull/6064)
* [fix: incorrect height for sidebar wrapper](https://github.com/rundeck/rundeck/pull/6063)
* [Log 4j2 support](https://github.com/rundeck/rundeck/pull/6052)
* [Grails 4 Upgrade](https://github.com/rundeck/rundeck/pull/6051)
* [Fix an issue that caused job execution to get stuck inside a loop when an exception was thrown from a log event call](https://github.com/rundeck/rundeck/pull/6050)
* [Docker - Update Ubuntu LTS to 18.04](https://github.com/rundeck/rundeck/issues/6032)
* [Remove rd-acl](https://github.com/rundeck/rundeck/pull/5920)
* [Rundeck secrets are group and world readable](https://github.com/rundeck/rundeck/issues/3017)

## Contributors

* Carlos Eduardo (carlosrfranco)
* Forrest Evans (fdevans)
* Greg Schueler (gschueler)
* Muneyuki Noguchi (mnogu)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* carlos
* niravassar

## Bug Reporters

* ProTip
* carlosrfranco
* gmr
* gschueler
* ltamaster
* mnogu
* sjrd218
