# Release history

## Most Recent Release Notes

## Supported versions vs. these pages

[**Runbook Automation support**](/history/release-calendar.md) covers released versions for **up to one year** from the original release date. Anything outside that window is **out of support** for enterprise assistance—even if installers still run.

Use the **[release calendar](/history/release-calendar.md)** to see which versions are supported today and to plan upgrades ahead of the one-year boundary.

::: tip Why keep older release notes?
Archives here are **historical context**: when a feature appeared, what changed in a given minor release, or what to read before jumping several versions.
:::

## Latest release (docs build)

The link below tracks **`RUNDECK_VERSION`** from the docs build (see project setup). It resolves to the correct major line (`5_x`, `6_x`, …) automatically.

<p><RouterLink :to="`/history/${String($rundeckVersion).split('.')[0]}_x/version-${$rundeckVersion}.md`">Release notes for {{ $rundeckVersion }}</RouterLink></p>

For the authoritative **supported** list and dates, use the **[release calendar](/history/release-calendar.md)**.

## Archives by release line

Individual version pages live under each folder (for example `history/5_x/version-5.20.0.md`). Use your editor or repo search to browse a series; the calendar links many **5.x** entries explicitly.

### Rundeck 6.x

[6.0.0](/history/6_x/version-6.0.0.md) - Current major release version series.

### Rundeck 5.x

Entry point for the line: [5.0.0](/history/5_x/version-5.0.0.md). Additional versions follow the same `version-x.y.z.md` pattern in `history/5_x/`.

### Rundeck 4.x

Entry point: [4.0.0](/history/4_x/version-4.0.0.md). Further notes in `history/4_x/`.

### Rundeck 3.4.x

Entry point: [3.4.0](/history/3_4_x/version-3.4.0.md). Further notes in `history/3_4_x/`.

### Rundeck 3.3.x

Entry point: [3.3.0](/history/3_3_x/version-3.3.0.md). Further notes in `history/3_3_x/`.

### Rundeck 3.2.x

Entry point: [3.2.0](/history/3_2_x/version-3.2.0.md). Further notes in `history/3_2_x/`.

## Upgrading

Step-by-step and version-specific guidance: **[Upgrading](/upgrading/index.md)**.
