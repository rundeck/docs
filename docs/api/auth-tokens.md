# Authentication Tokens

Authentication tokens can be managed via the API itself.

Note: as of Rundeck 2.8, Authentication tokens are generated with a unique ID as well as a token string. Listing
tokens will show the ID instead of the token string, and the ID should be used to manage the token instead of the
token string itself.  Token strings can be retrieved with the [/api/V/token/[ID]][/api/V/token/\[ID\]] endpoint.

## List Tokens ####

List all tokens or all tokens for a specific user.

**Request:**

    GET /api/11/tokens
    GET /api/11/tokens/[USER]

**Response (API version: 19):**

`application/xml`:

```xml
<tokens user="user3" count="4">
  <token user="user3" id="ece75ac8-2791-442e-b179-a9907d83fd05"
  creator="user3">
    <expiration>2017-03-25 14:16:50.848 PDT</expiration>
    <roles>
      <role>DEV_99</role>
      <role>FEDCD25B-C945-48D3-9821-A10D44535EA4</role>
    </roles>
    <expired>false</expired>
  </token>
  <token user="user3" id="abcb096f-cef4-451a-bd2b-43284a3ff2ad"
  creator="user3">
    <expiration>2017-03-25 14:17:12.935 PDT</expiration>
    <roles>
      <role>SVC_XYZ</role>
      <role>devops</role>
      <role>user3</role>
    </roles>
    <expired>false</expired>
  </token>
  <token user="user3" id="a99bd86d-0125-4eaa-9b16-caded4485476"
  creator="user3">
    <expiration>2018-03-24 14:17:26.253 PDT</expiration>
    <roles>
      <role>user</role>
      <role>FEDCD25B-C945-48D3-9821-A10D44535EA4</role>
    </roles>
    <expired>false</expired>
  </token>
  <token user="user3" id="c13de457-c429-4476-9acd-e1c89e3c2928"
  creator="user3">
    <expiration>2017-03-24 14:18:55.699 PDT</expiration>
    <roles>
      <role>USER_ACCOUNT</role>
    </roles>
    <expired>true</expired>
  </token>
</tokens>
```

`application/json`:

```json
[
  {
    "user": "user3",
    "id": "ece75ac8-2791-442e-b179-a9907d83fd05",
    "creator": "user3",
    "expiration": "2017-03-25T21:16:50Z",
    "roles": [
      "DEV_99",
      "FEDCD25B-C945-48D3-9821-A10D44535EA4"
    ],
    "expired": false
  },
  {
    "user": "user3",
    "id": "abcb096f-cef4-451a-bd2b-43284a3ff2ad",
    "creator": "user3",
    "expiration": "2017-03-25T21:17:12Z",
    "roles": [
      "SVC_XYZ",
      "devops",
      "user3"
    ],
    "expired": false
  },
  {
    "user": "user3",
    "id": "a99bd86d-0125-4eaa-9b16-caded4485476",
    "creator": "user3",
    "expiration": "2018-03-24T21:17:26Z",
    "roles": [
      "user",
      "FEDCD25B-C945-48D3-9821-A10D44535EA4"
    ],
    "expired": false
  },
  {
    "user": "user3",
    "id": "c13de457-c429-4476-9acd-e1c89e3c2928",
    "creator": "user3",
    "expiration": "2017-03-24T21:18:55Z",
    "roles": [
      "USER_ACCOUNT"
    ],
    "expired": true
  }
]
```

**Response (API version: 18 and earlier):**

`application/xml`:

All users:

``` xml
<tokens count='3' allusers='true'>
  <token id='DRUVEuCdENoPkUpDkcDcdd6PeKkPdurc' user='alice' />
  <token id='VprOpDeDP3KcK2dp37p5DoD6o53cc82D' user='bob' />
  <token id='EveKe1KSRORnUN28D09eERDN3OvO4S6N' user='frank' />
</tokens>
```

For a specific user:

``` xml
<tokens count='1' user='alice'>
  <token id='DRUVEuCdENoPkUpDkcDcdd6PeKkPdurc' user='alice' />
</tokens>
```

`application/json`:

``` json
[
  {
    "user": "alice",
    "id": "DRUVEuCdENoPkUpDkcDcdd6PeKkPdurc"
  },
  {
    "user": "bob",
    "id": "VprOpDeDP3KcK2dp37p5DoD6o53cc82D"
  },
  {
    "user": "frank",
    "id": "EveKe1KSRORnUN28D09eERDN3OvO4S6N"
  }
]
```

## Get a token ####

Get a specified auth token.

Note: API Version 19 and later uses the token ID instead of the token string.

**Request:**

    GET /api/11/token/[ID]

**Response (API version: 19):**

The token includes the `creator` of the token, as well as the `user` (the effective username) of the token.
The `id` is the unique ID, and the `token` value is the token string.

`application/xml`

``` xml
<?xml version="1.0" encoding="utf-8"?>
<token user="user3" token="VjkbX2zUAwnXjDIbRYFp824tF5X2N7W1"
id="c13de457-c429-4476-9acd-e1c89e3c2928" creator="user3">
  <expiration>2017-03-24T21:18:55Z</expiration>
  <roles>
    <role>USER_ACCOUNT</role>
  </roles>
  <expired>true</expired>
</token>
```

`application/json`

``` json
{
  "user": "user3",
  "token": "VjkbX2zUAwnXjDIbRYFp824tF5X2N7W1",
  "id": "c13de457-c429-4476-9acd-e1c89e3c2928",
  "creator": "user3",
  "expiration": "2017-03-24T21:18:55Z",
  "roles": [
    "USER_ACCOUNT"
  ],
  "expired": true
}
```

**Response (API version: 18 and earlier):**

The `id` value returned is the token string.

`application/xml`

``` xml
<token id='DuV0UoDUDkoR38Evd786cdRsed6uSNdP' user='alice' />
```

`application/json`

``` json
{
  "user": "alice",
  "id": "DuV0UoDUDkoR38Evd786cdRsed6uSNdP"
}
```

## Create a Token ####

Create a new token for a specific user.  Specify custom roles and duration if authorized.

**Request:**

    POST /api/11/tokens
    POST /api/11/tokens/[USER]

The user specified must either be part of the URL, or be part of the request content.

**For API v18 and earlier**: by default the role `api_token_group` is set for the generated token,
and the duration will be the maximum allowed token duration.  If `user` is present in the URL, then the request content is ignored and can be empty.

**For API v19 and later**: A content body is expected, and `roles` must be specified, and `duration` is optional.

If unset, duration will be the maximum allowed token duration.

If the `roles` value is the string `*` (asterisk), and the token is generated for oneself (i.e. the authenticated user),
then the generated token will have all roles as the authenticated user.


`Content-type: application/xml`

``` xml
<user user="alice" roles="sre,dev" duration="120d"/>
```

Requesting all available roles for the same user:

``` xml
<user user="alice" roles="*" duration="120d"/>
```

`Content-type: application/json`

``` json
{
  "user": "alice",
  "roles": [
    "sre",
    "dev"
  ],
  "duration": "120d"
}
```

`roles` can be a comma-separated string:

``` json
{
  "user": "alice",
  "roles": "sre,dev",
  "duration": "120d"
}
```

**Response (API version: 19):**

`application/xml`

``` xml
<token user="alice" token="4ehYi11hDHtxwVK6it4IhNFvbQcYmAJp"
id="4073a4c5-336c-4157-942a-41639379c100" creator="admin">
  <expiration>2017-07-22T22:45:18Z</expiration>
  <roles>
    <role>dev</role>
    <role>sre</role>
  </roles>
  <expired>false</expired>
</token>
```

`application/json`

``` json
{
  "user": "alice",
  "token": "08e7rlGwwnqoX6lzewriXSabuqNMueTL",
  "id": "b6ea87e3-43e5-4210-bd51-b82f8e33d9a4",
  "creator": "admin",
  "expiration": "2017-07-22T22:43:53Z",
  "roles": [
    "dev",
    "sre"
  ],
  "expired": false
}
```

**Response (API version: 18 and earlier):**

`application/xml`

``` xml
<token user="alice" token="RZ9vHnHif4C46xLVvfq4ZVBrkZs3iNuQ" />
```

`application/json`

``` json
{
  "user": "alice",
  "token": "mfAqxIZPlXIT8qQOD98RvMUcgCwOXbqc"
}
```

## Delete a token ####

Delete a specified auth token.

**Request:**

    DELETE /api/11/token/[ID]

Response:

    204 No Content