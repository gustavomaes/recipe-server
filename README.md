<img src="https://uc1a0f0ba809bb439379aeb4428b.dl.dropboxusercontent.com/p/thumb/AAES10B_6zzIR5R5zlxV6Eoav_qNiGACxRYVVhl7UEz6UDLNan0N92X0INwm9AV9oDtM7Cwklf44r8vgi3_qs29L0gvNB8IBWQAfx1HCYSwxtk7jwf3EbM4Dbl4E-124QmS11806PZAt7FXgfhit5DdXwQyRqkqaTBQeK1Bdn4PeNq7_V4FIEdoKr1MQFYfUX1AODYowqiqaqZBNwRf53Nsz2-s8bulExjmsevKt-gZdGg/p.png?preserve_transparency=1&size=2048x1536&size_mode=3" width="137px" height="137px" align="left"/>

# Receipes API
Application developed for study

## Table of Contents

- [Technology](#technology)
- [Developing](#developing)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
	- [Users](#users)
		- [Authenticate](#authenticate)
		- [Create a new user](#create-a-new-user)
		- [Update your user](#update-your-user)
		- [Update user by id](#update-user-by-id)
		- [Update password](#update-password)
		- [Get my user](#get-my-user)
		- [Get user by id](#get-user-by-id)
		- [Get all users](#get-all-users)
		- [Delete user](#delete-user)
	- [Recipes](#recipes)
		- [Create a new recipe](#create-a-new-recipe)
		- [Update recipe by id](#update-recipe-by-id)
		- [Get all recipes](#get-all-recipes)
		- [Get recipe by id](#get-recipe-by-id)
		- [Get my recipes](#get-my-recipes)
		



## Technology

- **NodeJS
- **ExpressJS
- **MongoDB

## Developing

1. **Clone the repository:**
  ```sh
  $ git clone git@github.com:gustavomaes/recipe-server.git
  ```
  
2. **Install packages:**
```sh
$ yarn install
```

3. **Run server:**
  ```sh
  $ yarn start
  ```

## Authentication:

All the authentication happens using JWT. For protected endpoints you need to send the token using the Header Authorization, like this:

```
x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjJjMDlkMzE3MGI4MTc1NDZjMjQzYyIsImVtYWlsIjoiZ3VzdGF2b0BnbWFpbC5jb20iLCJuYW1lIjoiR3VzdGF2byAyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MjkzMjA3NTN9.sQ2Js_PVh_-A9ZTMSzuQwKzmn3uQ_FXa3q1RRauBMB8

```  

## Endpoints

### Users:

#### Authenticate:

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
	"name":"Teste",
	"email":"teste@teste.com",
	"password":"123456"
}
```

#### Update your user:

`PUT /user` (authentication required): Update data from the logged user/token.

```
{
	"name":"Teste",
	"email":"teste@teste.com"
}
```

#### Update user by id:

`PUT /user/:userId` (authentication required): Update data for a specific user. Admin can update information from any.

```
{
	"name":"Teste",
	"email":"teste@teste.com"
}
```

#### Update password:

`PUT /user/password` (authentication required): Update password from the logged user/token.

```
{
	"password":"123456",
	"newPassword":"1234567"
}
```

#### Get my user:

`GET /user/me` (authentication required): Gets information from the logged user/token.

#### Get user by id:

`GET /user/:userId` (authentication required): Gets information from specific user. *Only admin*

#### Get all users:

`GET /user` (authentication required): Gets all registered users. *Only admin*

#### Delete user:

`DELETE /user/:userId` (authentication required): Remove a specific user. *Only admin*

### Recipes:
#### Create a new recipe:

`POST /recipe` (authentication required): Creates a new recipe to logged user.

```
{
	"name": "Title",
	"description": "Description",
	"time": "55 min",
	"serving": "5",
	"ingredients": ["100g ingredient one", "1 Kg ingredient two", ...],
	"preparation": ["first step", "second step", ...],
	"photo":"data:image/jpeg;base64, ..."
}
```

#### Update recipe by id:

`PUT /recipe/:recipeId` (authentication required): Update data for a specific recipe. *Admin can update data from any run.*

```
{
	"name": "New title",
	"description": "New description",
	"time": "40 min",
	"serving": "3",
	"ingredients": ["200g ingredient one", "1 Kg ingredient two", ...],
	"preparation": ["first step", "second steo", ...],
	"photo":"data:image/jpeg;base64, ..."
}
```

#### Get all recipes:

`GET /recipe`: Gets all recipes.

#### Get recipe by id:

`GET /recipe/:recipeId`: Gets information from specific recipe.

#### Get my recipes:

`GET /recipe/my` (authentication required): Gets recipes from the logged user/token.
