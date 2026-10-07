# WinRM Check Plugin

The WinRM Check plugin provides a way to check the connection with a remote node using winrm-python. The following WinRM Check plugin is available for PagerDuty Runbook Automation:

- [WinRM Check Plugin](#winrm-check-plugin)
    - [WinRM Check Step](#winrm-check-step)

:::tip Open Source Plugin
The WinRM Check plugin is open source and available on [GitHub](https://github.com/rundeck-plugins/py-winrm-plugin).
:::

:::tip Python version
PyWinRM-based steps require **Python 3.8+** on the process host (Rundeck server or **Enterprise Runner**). **Python 2 is not supported.** See [Upgrading to Rundeck 6.0](/upgrading/upgrading-to-6.0.md#py-winrm-plugin-python-38).
:::

### WinRM Check Step

![WinRM Check Step](/assets/img/winrm-check-node-step.png)<br>

The **WinRM Check Step** plugin checks the connection with a remote node using winrm-python. The plugin requires the following fields:

* **Python Interpreter**: The Python interpreter to use. Default is `python3`. Accepts a command name or a full path (for example a virtualenv interpreter).
    * Example: `python3` or `/opt/winrm-venv/bin/python3`
* **Hostname**: The hostname of the Windows machine.
    * Example: `windows.example.com`
* **Authentication Type**: The authentication type to use.
    * Example: `basic`
* **WinRM Transport Protocol**: The WinRM transport protocol to use. Default is `http`.
    * Example: `https`
* **No SSL Verification**: When set to true, SSL certificate validation is not performed. Default is `false`.
    * Example: `true`
* **Disable TLS 1.2**: Disable TLS 1.2 in order to run over TLS 1.0. Default is `false`.
    * Example: `true`
* **WinRM Port**: The WinRM port to use. Default is `5985` for `http` and `5986` for `https`.
    * Example: `5986`
* **Certificate Path**: The path to the certificate for SSL verification.
    * Example: `/path/to/cert.pem`
* **Username**: The username for the Windows machine.
    * Example: `admin`
* **Password Storage Path**: The path to the stored password.
    * Example: `keys/admin_password`
* **Debug**: Write debug messages.
    * Example: `true`
* **krb5 Config File**: The path to the `krb5.conf` file.
    * Example: `/etc/krb5.conf`
* **Kinit Command**: The `kinit` command to use.
    * Example: `kinit`
* **Kerberos Delegations**: If true, the TGT is sent to the target server to allow multiple hops. Default is `false`.
    * Example: `true`
* **Proxy**: Proxy address for communicating with the Windows node. Example HTTP proxy strings are `http://server:port` and `http://user:pass@server:port`. An example SOCKS5 proxy string is `socks5://user:pass@server:port`.
    * Example: `http://proxy.example.com:8080`
* **No Proxy List**: Comma-separated list of hosts, IPs, or CIDRs that should bypass the proxy. Supports exact IPs, CIDR notation (`192.168.1.0/24`), domain suffixes (`.internal.corp`), hostnames, and wildcard (`*`).
    * Example: `10.0.0.0/8,.internal.corp`

