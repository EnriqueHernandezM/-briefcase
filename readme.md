# API-Briefcase_V1.0.0

## API from my portfolio of projects as a fullstack developer, developed in Node.js with a layered architecture.

🟢 App deploy Fly.io
https://briefcase.fly.dev/api_briefcase/v1

> The purpose of the RESTful API is the administration of the projects that I have carried out, through an SQlite database and image storage in aws s3.
> In addition to being able to grow by adding other databases

## Run App locally 🔧

in your terminal

```sh
cd root
```

install dependencies

```sh
npm i
```

### Scripts

production with SQlite

```sh
 a) npm start
```

development with fs

```sh
b) npm run dev
```

### Scripts tests

tests for the index of routes that the api has

```sh
 a) npm run test
```

!!important

> When carrying out our tests, for the moment it is necessary to comment the checkAuthentication middlewares in the routes.
> In addition to understanding the part that when the application runs in dev, tests should be done by directly sending an array with image URLs to not use aws s3 resources with the test_projects_not_s3 script.
> If the api is running in production, testing should be done by sending test files, therefore the test_projects_with_s3 script will be used.

#### test directly sending url array without using s3

using only fs

```sh
a) test_projects_not_s3
```

#### tests using files and storing in s3

using only SQlite

```sh
b) test_projects_with_s3
```

## api capabilities🚀

```sh
1.- Creaate an admin
a)To create a new user you need to send a query param with your pin ?pinAdmin=####
2.- Login an logout admin
3.- Add and remove paths from index
3.- Get all projects
4.- Add a new project with images, title ,description, link to visit and tags
5.- Get and update one project
6.- Delete a project
```

## !!brefcase.postman file for testing

## !!.envExample file for environment variables

## Built with 🛠️

Technologies and Libraries implemented

- [javaScript](https://www.w3schools.com/js/js_es6.asp) - ECMAScript 6 Interpreted Programming Language
- [Node.js](https://nodejs.org/es/docs) - Runtime environment
- [Express](https://expressjs.com/es/) - Framework for web applications
- [aws-sdk/client-s3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/) - object storage service
- [Express-session](https://www.npmjs.com/package/express-session) - session data storage
- [Express-fileupload](https://www.npmjs.com/package/express-fileupload) - middleware for uploading file
- [Joi](https://www.npmjs.com/package/joi) -Data validation
- [Winston](https://www.npmjs.com/package/winston) - Loggers
- [Passport](https://www.passportjs.org/) - Passport is authentication middleware.
- [Bcrypt](https://openbase.com/js/bcrypt/documentation) -
  Password hashing function.
- [Cors](https://www.npmjs.com/package/cors) - CORS (Cross-Origin Resource Sharing).

- [knex](https://knexjs.org/) - SQL Query Builder for JavaScript
- [redisLab](https://redis.com/es/) - session management
- [dotenv](https://www.npmjs.com/package/dotenv) -
  Environment Variables

## versioned

```sh
1.0.0
```

## Author

```sh
- Enrique Hernández Montiel
```
