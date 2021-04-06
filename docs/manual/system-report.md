# System Report (Enterprise)

:::enterprise
:::

The Enterprise System Report provides a breakdown of the Rundeck server's system statistics and information.

## General

The **General** tab provides a quick snapshot view of the Rundeck server instance.  
Information about CPU, Uptime, Memory and important version information can all be seen at a glance.

![System Report - General Tab](~@assets/img/system-report-general.png)

## Diagnostics

The **Diagnostics** tab offers an in-depth view of the configurations of Rundeck.  
The configurations are loaded from Memory rather than directly from the files in order to provide
the configuration that the Rundeck server is actively using.

To protect sensitive data configuration entries are classified in two ways:
- **Secure Data** for passwords, secrets, etc. are never be revealed on the System Report page
- **Concealed Data** is hidden by default but can be revealed in the Rundeck GUI only by clicking Show Data on that particular data entry.  
This would be for IP addresses, user names, etc.  This information may be necessary for troubleshooting.

![System Report - Diagnostic Tab](~@assets/img/system-report-showdata.gif)

### Export Report

To streamline support requests we have added the ability to export data from the System Report.  Our Enterprise Support team can use these exports
to look for common misconfigurations that cause issues.  When on the Diagnostic tab click the **Export Report** button.
It is possible to export specific sections as needed in either JSON format or plain text format.

![System Report - Export Report Window](~@assets/img/system-report-exportreport.png)

Items in the configuration marked as Secure or Concealed data (described above) will not be included in the export files.

:::danger Sensitive Data
Prior to sharing the exports with anyone, including Rundeck Support, please ensure that all sensitive data has been obscured in the export files.
:::
