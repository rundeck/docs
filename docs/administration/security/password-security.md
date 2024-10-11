# User Manager Password Security (Commercial)

:::enterprise
:::

Runbook Automation includes the [User Manager](/manual/user-management/user-mgmt.md) functionality to easily create local Rundeck logins. Rundeck 4.0+ include options to enforce password complexity.

## Password Length

To enable a minimum password length requirement set the following setting in Configuration Management or the `rundeck-config.properties` file. Replace `<integer>` with the required minimum number of characters for user passwords.

```
rundeck.password.minLength = <integer>
```

## Password Complexity

To enable password complexity enforcement set the following setting in Configuration Management or the `rundeck-configuration.properties` file.

```
rundeck.password.strength = <strength setting>
```

Password strength is scored from 0-4 based on the difficulty of guessing the password.  Possible integer values for `<strength-setting>` are listed below with descriptions:

- **0**: Easily guessable: risky password. (guesses < 10^3)

- **1**: Very guessable: protection from throttled online attacks. (guesses < 10^6)

- **2**: Somewhat guessable: protection from un-throttled online attacks. (guesses < 10^8)

- **3**: Safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)

- **4**: Very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)

The complexity check is implemented using the [zxcvbn library](https://github.com/dropbox/zxcvbn).
