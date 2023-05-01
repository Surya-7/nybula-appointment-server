
# Appointment Scheduler - Server

When it comes to scheduling meetings tracking their availability is pain. The purpose of this application is to easily schedule meetings based on their availability and can also mark off hours.
This is server side of the project. 





## Documentation

The server side of the project is developed using [Node js](https://nodejs.org/en/docs) and [Express js](https://expressjs.com/)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL`

`PORT`

`JWT_SECRET`


## Deployment

To deploy this project setup the routes and port number.

Specify the environment variables where the Mongodb URL and port number are declared.

To install all the node modules: 

```bash
  $ npm install
```

To start the server: 

```bash
  $ npm start
```




## Database Schema

#### User Databse :

| Content             | Type                                                                |
| ----------------- | ------------------------------------------------------------------ |
| FirstName | string |
| LastName | string |
| Email Id | string |
| Password | string |
| PicturePath | string |
| Location | string |
| Occupation | string |
| Availabity | Number (array) |


#### Meeting Databse :

| Content             | Type                                                                |
| ----------------- | ------------------------------------------------------------------ |
| UserId | string |
| FriendId | string |
| itemNo | Number |
| details | string |




## Host

The project is hosted using [render](https://render.com/). 

The project is live at: https://appointment-app-m560.onrender.com
