## WinRM Check Plugin

The WinRM Check plugin provides a way to check the connection with a remote node using winrm-python. The following WinRM Check plugin is available for PagerDuty Runbook Automation:

* [**WinRM Check Step (WinRMCheck)**](#winrm-check-step)

:::tip Open Source Plugin
The WinRM Check plugin is open source and available on [GitHub](https://github.com/rundeck-plugins/py-winrm-plugin).
:::

### WinRM Check Step

![WinRM Check Step](/assets/img/winrm-check-node-step.png)<br>

The **WinRM Check Step** plugin checks the connection with a remote node using winrm-python. The plugin requires the following fields:

* **Python Interpreter**: The Python interpreter to use. Default is `python`.
    * Example: `python3`
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

