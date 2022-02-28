# Log4Shell / Log4j Security

In December 2021 Rundeck Engineering team was made aware of the "Log4Shell" vulnerabilities related to Log4j.  This page documents the fixes put in place by the team as vulnerabilities were identified.

**Status:**

* [CVE-2021-45105][]
    * Fixed in Rundeck 3.4.9/3.3.17
* [CVE-2021-44228][] (RCE vulnerability)
    *  Fixed in Rundeck 3.4.8/3.3.16
    *  Partial fix in Rundeck 3.4.7/3.3.15
    *  Partial [mitigation](#mitigation-options) in previous versions (3.4.6 and 3.3.14 and earlier)
* [CVE-2021-45046][] (DOS attack)
    *  Fixed in Rundeck 3.4.8/3.3.16

**Recommendations:**

* Upgrade as soon as possible
* If you are still using Rundeck 3.4.6/3.3.14 or earlier, be sure to apply the [mitigation options](#mitigation-options) below to protect against the RCE vulnerability.

Downloads:

* Rundeck 3.4.9 - [Download site](https://download.rundeck.com)
* Rundeck 3.3.17 - [Download site](https://download.rundeck.com)

**Updates**

_Update December 20, 2021_

We will be releasing `3.4.9` and `3.3.17` today, which use Log4j version 2.17 to address the latest [Log4j CVE-2021-45105](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45105)


_Update December 14, 2021, 3pm PST_

We will be releasing `3.4.8` and `3.3.16` today, which use Log4j version 2.16 to address the latest [Log4j CVE-2021-45046](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046)


_Update December 14, 2021 10am PST_

Note that [A new Log4j CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046) has been issued. Rundeck Engineering is currently testing impacts and will update docs accordingly as soon as we have more information.
This CVE indicates a potential DOS attack is possible even with the [mitigation of CVE-2021-44228](#log4j-cve-2021-44228) applied.

[CVE-2021-44228]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228
[CVE-2021-45046]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046
[CVE-2021-45105]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45105

### Mitigation Options

Rundeck versions 3.4.6 and below can mitigate some risk with the actions below.  Note the [CVE-2021-045056](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45046) says a Denial-of-Service is still possible even with these mitigations.

* Add this flag to the JVM options for starting rundeck: `-Dlog4j2.formatMsgNoLookups=true`
* Modify the file `$RDECK_BASE/server/config/log4j2.properties`, replace the string `%m` with `%m{nolookups}`
