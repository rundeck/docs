# Release 3.3.1

Name: <span style="color: pink"><span class="glyphicon glyphicon-flash"></span> "onion ring pink gift"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

We hope you're taking full advantage of all the 3.3.x features we released earlier this month. The 3.3.0 release was our most ambitious and comprehensive release to date.  
Along with that came a few bugs that we've addressed here. There were some browser specific issues with the new Event Viewer in Firefox, an ACL import issue when moving from 3.2 to 3.3 plus a few other small errors. As always if you find a bug report it on [GitHub](https://github.com/rundeck/rundeck/issues) for us!

## Issues

* [Fix node view output not rendering](https://github.com/rundeck/rundeck/pull/6302)
* [Fix noisy cache warnings on startup](https://github.com/rundeck/rundeck/pull/6296)
* [Logs in Node View are broken since 3.3.0](https://github.com/rundeck/rundeck/issues/6292)
* [Allow a Rundeck server to be set as primary. ](https://github.com/rundeck/rundeck/pull/6280)
* [Update dependencies](https://github.com/rundeck/rundeck/pull/6277)
* [Fixes when to execute a job using "Remote URL options" #6275](https://github.com/rundeck/rundeck/pull/6276)
* [Scheduled jobs not running when using Remote URL options and enforcing from allowed values](https://github.com/rundeck/rundeck/issues/6275)
* [replace ehcache2 with jcache/ehcache3](https://github.com/rundeck/rundeck/pull/6274)
* [Update snakeyaml to 1.26](https://github.com/rundeck/rundeck/pull/6271)
* [Reduce console messages in standalone war launch](https://github.com/rundeck/rundeck/pull/6257)
* [Docker - Add / on rundeck/jaas/file/required](https://github.com/rundeck/rundeck/pull/6255)
* [Fix #6239 acls not imported during fs conversion upgrading from 3.2 to 3.3](https://github.com/rundeck/rundeck/pull/6254)
* [Fix activity list options scrolling in FireFox](https://github.com/rundeck/rundeck/pull/6253)
* [Fix log viewer and adhoc command page in FireFox ESR(68)](https://github.com/rundeck/rundeck/pull/6248)
* [Fixes API call using asterisk #6069](https://github.com/rundeck/rundeck/pull/6245)
* [Set ehcache missing cache strategy to 'create' to avoid warnings](https://github.com/rundeck/rundeck/pull/6244)
* [Project ACL's are gone after upgrading to v3.3](https://github.com/rundeck/rundeck/issues/6239)
* [Rundeck 3.3.0 - log viewer broken in Firefox](https://github.com/rundeck/rundeck/issues/6232)
* [Rundeck 3.3.0 node filter broken in Firefox](https://github.com/rundeck/rundeck/issues/6230)
* [ Fix URI parse message on Windows for log4j2 config file](https://github.com/rundeck/rundeck/pull/6228)
* [Log4j2 path parse error message on Windows startup](https://github.com/rundeck/rundeck/issues/6227)
* [Open additional modules for reflective access to avoid illegal reflective access warnings](https://github.com/rundeck/rundeck/pull/6226)
* [Starting Rundeck with a JDK 11+ runtime reports Illegal reflective access errors](https://github.com/rundeck/rundeck/issues/6225)
* [Add the ability to send webhook notifications in json format](https://github.com/rundeck/rundeck/pull/6217)
* [Updates an existing plugin when using plugin upload GUI instead of reporting error](https://github.com/rundeck/rundeck/pull/6216)
* [Ignore the unsupported exception thrown when posix file permissions are set](https://github.com/rundeck/rundeck/pull/6215)
* [Output Viewer Safari style fixes](https://github.com/rundeck/rundeck/pull/6213)
* [Ansi color 24 bit support, Fix #6198 bold mode plus 256 color should work](https://github.com/rundeck/rundeck/pull/6209)
* [Add ability to configure object storage plugin with a region](https://github.com/rundeck/rundeck/pull/6205)
* [Add region configuration to object store plugin](https://github.com/rundeck/rundeck/issues/6203)
* [Enhance YAML multiline export functionality](https://github.com/rundeck/rundeck/pull/6200)
* [Performance enhancement for job takeover process](https://github.com/rundeck/rundeck/pull/6199)
* [Misinterpreted ANSI escape sequence](https://github.com/rundeck/rundeck/issues/6198)
* [UI glitch in Jobs activity when using long options names](https://github.com/rundeck/rundeck/issues/6145)

## Contributors

* Greg Schueler (gschueler)
* Jaime Tobar (jtobard)
* Nicole Valenzuela (nvalenzuela20)
* Greg Zapp (ProTip)
* Stephen Joyner (sjrd218)
* cpoule23

## Bug Reporters

* ProTip
* Ziemowit-LH
* cpoule23
* damienbertau
* greg0ire
* gschueler
* jtobard
* mazzella-c
* nvalenzuela20
* sjrd218
* vonBork
