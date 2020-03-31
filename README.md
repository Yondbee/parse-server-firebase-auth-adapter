# Parse-server-firebase-auth-adapter
Authenticate to parse server with your Firebase account

## Getting Started
### 1) Install the module
```js
npm i parse-server-firebase-auth-adapter
```
### 2) Add environment variable

* Copy the generated service account ".json" file from the Firebase console on the server.
* Add new environment variable to your deployment.
```bash

// This points to the JSON service account
export GOOGLE_APPLICATION_CREDENTIALS = '/opt/secure/firebaseAccountKey.json'

```
### 3) Add this module to the config.json of your install

```json
{
  "auth": {
    "module": "parse-server-firebase-auth-adapter",
    "databaseURL": "https://<DATABASE_NAME>.firebaseio.com"
  }
}
```
### 4) Using Firebase access token in our project via REST APIs
* Get Parse access token by POST a raw data to `/parse/users`
```sh
curl -X POST \
  {{host}}/parse/users \
  -H 'content-type: application/json' \
  -H 'x-parse-application-id: {{ParseAppId}}' \
  -d '{
    "authData": {
    	"firebase": {
    		"access_token": "{{access_token}}",
    		"uid": "{{FirebaseUID}}"
    	}
    }
}'
```
