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

_Update December 14, 2021, 3pm PST_
We have released versions `3.4.8` and `3.3.16` which use Log4j version 2.16 to address the latest [Log4j CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046)


_Update December 14, 2021 10am PST_
Note that [A new Log4j CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046) has been issued. Rundeck Engineering is currently testing impacts and will update docs accordingly as soon as we have more information.

### Mitigation Options

[A new Log4j CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046) was issued that recommends updating the Log4j package to 2.16.  Previously documented mitigation options were invalidated by this finding and the recommendation is to update Rundeck to one of the versions listed below

* Rundeck 3.4.8 - [Download site](https://download.rundeck.com)
* Rundeck 3.3.16 - [Download site](https://download.rundeck.com)

Rundeck versions 3.4.6 and below can mitigate some risk with the actions below.  Note the [CVE-2021-045056](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046) says a Denial-of-Service is still possible even with these mitigations.

* Add this flag to the JVM options for starting rundeck: `-Dlog4j2.formatMsgNoLookups=true`
* Set env var `LOG4J_FORMAT_MSG_NO_LOOKUPS=true`
* Modify the file `$RDECK_BASE/server/config/log4j2.properties`, replace the string `%m` with `%m{nolookups}`
