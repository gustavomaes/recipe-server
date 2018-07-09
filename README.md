<img src="https://uc1a0f0ba809bb439379aeb4428b.dl.dropboxusercontent.com/p/thumb/AAES10B_6zzIR5R5zlxV6Eoav_qNiGACxRYVVhl7UEz6UDLNan0N92X0INwm9AV9oDtM7Cwklf44r8vgi3_qs29L0gvNB8IBWQAfx1HCYSwxtk7jwf3EbM4Dbl4E-124QmS11806PZAt7FXgfhit5DdXwQyRqkqaTBQeK1Bdn4PeNq7_V4FIEdoKr1MQFYfUX1AODYowqiqaqZBNwRf53Nsz2-s8bulExjmsevKt-gZdGg/p.png?preserve_transparency=1&size=2048x1536&size_mode=3" width="137px" height="137px" align="left"/>

# Receipes API
Application developed for study

## Table of Contents

- [Technology](#technology)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
	- [Users](#users)
		- [Authenticate/login](#authenticate/login)
		- [Create a new user](#create-a-new-user)
		- [Update your user](#update-your-user)
		- [Update user by id](#update-user-by-id)



## Technology

- **NodeJS
- **ExpressJS
- **MongoDB

## Authentication:

All the authentication happens using JWT. For protected endpoints you need to send the token using the Header Authorization, like this:

```
x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjJjMDlkMzE3MGI4MTc1NDZjMjQzYyIsImVtYWlsIjoiZ3VzdGF2b0BnbWFpbC5jb20iLCJuYW1lIjoiR3VzdGF2byAyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MjkzMjA3NTN9.sQ2Js_PVh_-A9ZTMSzuQwKzmn3uQ_FXa3q1RRauBMB8

```  

## Endpoints
### Users:

#### Authenticate/login:

Gets a new Token/JWT for the required user.

`POST /user/auth`: generates a new token for the required user.

```
{
	"email": "teste@teste.com",
	"password": "123456"
}
```

#### Create a new user:

`POST /user`: create new user.

```
{
{
	"name":"Teste",
	"email":"teste@teste.com",
	"password":"123456"
}
}
```

#### Update your user:

`PUT /user` (authentication required): Update data from the logged user/token.

```
{
{
	"name":"Teste",
	"email":"teste@teste.com"
}
}
```

#### Update user by id:

`PUT /user/:userId` (authentication required): Update data for a specific user. Admin can update information from any.

```
{
{
	"name":"Teste",
	"email":"teste@teste.com"
}
}
```
