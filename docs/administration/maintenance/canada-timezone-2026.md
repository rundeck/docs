# 2026 Canadian Time Zone Changes: Interim Workaround

::: tip Interim guidance
**Rundeck 6.3.0** includes a partial fix: the web UI is updated for all four zones. Server-side scheduling still depends on your Java runtime. **Releases before 6.3.0** have neither fix and need the workaround for both the web UI and job schedules. Changes in the time zone database take effect **November 1, 2026, 02:00 local time**.
:::

## What's changing

Several Canadian provinces and territories are ending seasonal clock changes and staying on their current "summer" offset permanently. The global timezone database (IANA tzdb) records each change as taking effect **November 1, 2026 at 02:00**:

| Region | Time zone ID | New permanent offset | First tzdb release with the change |
|---|---|---|---|
| British Columbia | `America/Vancouver` | UTC-07:00 | 2026b |
| Alberta | `America/Edmonton` | UTC-06:00 | 2026c |
| Northwest Territories | `America/Inuvik` | UTC-06:00 | 2026d |
| Manitoba | `America/Winnipeg` | UTC-05:00 | 2026e |

Software uses its own copy of this database. If that copy is older than the release listed above, it still expects clocks in that zone to "fall back" one hour on November 1. Times in that zone will then be **one hour off from November 2 onward**.

## Who is affected

You are affected if you have **job schedules, or use date/time inputs, set to any of the zones above**.

Jobs scheduled in other time zones, including UTC (the default), are **not** affected.

| Component | Current timezone data | Affected zones |
|---|---|---|
| Server: official Docker images (Ubuntu 22.04 OpenJDK 17 package) | 2026b | Edmonton, Inuvik, Winnipeg |
| Server: installed on your own OS (DEB/RPM/WAR) | Whatever Java runtime is installed on that host | Check your environment |
| Self-hosted runners | Whatever Java runtime is installed on that host | Check your environment |
| Web UI, Rundeck 6.3.0 and later | 2026e | None |
| Web UI, releases before 6.3.0 | 2019a | All four zones |

::: tip Runbook Automation SaaS
On SaaS, we manage the server and its Java runtime. The SaaS web UI already includes the updated timezone data (tzdb 2026e), so no web UI workaround is needed. Updated Java timezone data for the server will be included in an upcoming version, once it is available upstream. Until then, the interim workaround below applies to SaaS job schedules.

Self-hosted runners connected to SaaS use the Java runtime installed on your host, not ours. Check and update those runtimes yourself. See [Check your current timezone data](#check-your-current-timezone-data).
:::

## Interim workaround: use an equivalent zone

Each affected region is moving to an offset that another long-established zone **already uses all year, with no daylight saving time**. Those zones exist in every copy of the timezone database, old or new. Switching to them gives the correct time **now, on November 1, and after**, whichever version you're running.

| If you use... | Temporarily switch to... | Offset (all year) |
|---|---|---|
| `America/Vancouver` | `America/Phoenix` | UTC-07:00 |
| `America/Edmonton` | `America/Regina` | UTC-06:00 |
| `America/Inuvik` | `America/Regina` | UTC-06:00 |
| `America/Winnipeg` | `America/Panama` | UTC-05:00 |

Each substitute was checked against both the old (2019a) and new (2026e) timezone data, from October 2026 through 2030. The local time matched on every date.

::: warning
**Do not use `America/Whitehorse` as a substitute for Vancouver.** Yukon's own permanent-time change in 2020 isn't included in older timezone data, so those versions would still show UTC-08:00.
:::

### How to apply it

1. **Job schedules:** edit each scheduled job that uses an affected zone. Under **Schedule → Time Zone**, select the substitute zone from the table above and save.
2. **Run later / date-time pickers:** when choosing a date and time for a future run, enter the time as if you were in the substitute zone. The local clock time is the same.
3. **Already-queued future executions:** if you scheduled a one-time run for a date after November 1 in an affected zone, check its start time and reschedule it if needed.

### Things to know

- **Display names change.** Times show the substitute's abbreviation (e.g. `MST` for Phoenix, `CST` for Regina, `EST` for Panama) and its zone name instead of the Canadian city. The clock time itself is correct.
- **Switch back after the full fix.** Once you're on a release and runtime with tzdb 2026e or later, change your schedules back to the original Canadian zone. Substitute zones could change their own rules in the future, and the original zone ID is the accurate one for your location.
- **Vancouver, server-only cases:** the server already has the British Columbia change (2026b). The Vancouver substitute is needed only for the web UI on releases before 6.3.0, and for self-managed Java runtimes older than 2026b.

## Full fix (in progress)

- **Web UI:** fixed in **Rundeck 6.3.0**. The bundled timezone library is updated to tzdb 2026e, which covers all four zones. Upgrade to 6.3.0 or later.
- **Official Docker images:** the image already runs the newest available Ubuntu 22.04 base and Java packages. The Java runtime's timezone data will be updated to 2026e as soon as it's available upstream, or through a timezone updater. Pull the updated image once it's released.
- **Installed on your own OS (DEB/RPM/WAR) and self-hosted runners:** our image updates don't reach these, because they use the Java runtime installed on your host. Make sure that runtime includes tzdb 2026e or later (see the check below). Update it through your OS package manager or Java vendor, or apply the vendor's timezone updater tool. You also need to upgrade to Rundeck 6.3.0 or later for the web UI fix.

## Check your current timezone data

**Java runtime:**

```bash
echo 'System.out.println(java.time.zone.ZoneRulesProvider.getVersions("America/Winnipeg").lastEntry().getKey())' | jshell -q -
```

The output should be `2026e` or later. (`jshell` is included in full JDK installs. A JRE-only install needs the vendor's timezone updater tool or the vendor's release notes instead.)

**Web UI (browser console, on a legacy Rundeck page):**

```js
moment.tz.dataVersion
```

The output should be `2026e` or later.

## References

- [IANA tzdb release notes](https://data.iana.org/time-zones/tzdb/NEWS)
- [Scheduled Jobs](/manual/jobs/creating-jobs.md#scheduled-jobs)
