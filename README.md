# Recipes API 0.1


This API was written in NodeJS (ExpressJS + JWT + MongoDV).


## Authentication:

All the authentication happens using JWT. For protected endpoints you need to send the token using the Header Authorization, like this:

```
x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjJjMDlkMzE3MGI4MTc1NDZjMjQzYyIsImVtYWlsIjoiZ3VzdGF2b0BnbWFpbC5jb20iLCJuYW1lIjoiR3VzdGF2byAyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MjkzMjA3NTN9.sQ2Js_PVh_-A9ZTMSzuQwKzmn3uQ_FXa3q1RRauBMB8

```

# Endpoints

## Users:

### Authenticate/login:

Gets a new Token/JWT for the required user.

`POST /user/auth`: generates a new token for the required user.

#### Body example:

```
{
	"email": "teste@teste.com",
	"password": "123456"
}
```
