# Fullstack social media application.

Built in order to tie in my learning of react and the backend. 

## Lessons learned.
Main reason for using Redux is that it is the most popular choice for state managment within the industry

An important lesson from this project is that the frontend needs to be more responsive with regards to data fetching. Loading posts should provide a skeleton UI that indicates loading. Liking a post should make it more responsive with optimistic updates and then change back and provide an error if it fails on the backend. In my next project I'm hoping to implement React Querry as it is regarded to be better than RTK Querry and much simpler to use. This may mean using other state managment solution. 


##  How to run locally 
clone the repository
### The frontend
`cd src` 

`npm install` to install dependencies 

`npm run start` to start the dev environment

### The backend
You will need to create a MongoDB cluster and comply with the ER diagram at the bottom of the page


`cd server`

`touch .env` create an env file and populate it with the following environment variables:

JWT_SECRET

MONGO_URL

PORT

`npm install` to install dependencies 

`npm run start-dev` to start the dev environment

## ER diagram

![ER diagram](./ERdiagram.png)
