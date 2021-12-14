# Security Advisories

These are the Security Advisories Rundeck has issued in the past:

* [CVE-2021-39133](CVE-2021-39133.md)<br>
    Cross-Site Request Forgery (CSRF) can run untrusted code on Rundeck server.
* [CVE-2021-39132](CVE-2021-39132.md)<br>
    YAML deserialization can run untrusted code.
* [CVE-2020-11009](CVE-2020-11009.md)<br>
    IDOR can reveal execution data and logs to unauthorized user.

## Log4J CVE-2021-44228

The Rundeck Engineering team is aware of the [Log4J CVE-2021-44228 vulnerability](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) and actively working on mitigation and fixes.  Please check back at this page for updates.

### Mitigation UPDATED

Rundeck versions 3.4.6 and below can mitigate the CVE with any of these actions:

* Add this flag to the JVM options for starting rundeck: `-Dlog4j2.formatMsgNoLookups=true`
* Set env var `LOG4J_FORMAT_MSG_NO_LOOKUPS=true`
* Modify the file `$RDECK_BASE/server/config/log4j2.properties`, replace the string `%m` with `%m{nolookups}`

[Rundeck 3.4.7](http://download.rundeck.com) and has been released with the updated log4j dependency.

[Rundeck 3.3.15](http://download.rundeck.com) is also available with this fix.
