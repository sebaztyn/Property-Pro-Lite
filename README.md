[![Build Status](https://travis-ci.com/sebaztyn/Property-Pro-Lite.svg?branch=develop)](https://travis-ci.com/sebaztyn/Property-Pro-Lite)
[![Coverage Status](https://coveralls.io/repos/github/sebaztyn/Property-Pro-Lite/badge.svg?branch=develop)](https://coveralls.io/github/sebaztyn/Property-Pro-Lite?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8430a8235bec16ca60bd/maintainability)](https://codeclimate.com/github/sebaztyn/Property-Pro-Lite/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8430a8235bec16ca60bd/test_coverage)](https://codeclimate.com/github/sebaztyn/Property-Pro-Lite/test_coverage)
# Property-Pro-Lite
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

#### Table of Contents
* [Technologies](#Technologies)
* [Tools and Modules](#Tools-and-Modules)
* [Development Setup](#Development-Setup)
* [Template URL](#Template-URL)
* [API URL](#API-URL)
* [API Documentation](#API-Documentation)
* [User Access](#User-Access)
* [How to get a local copy and Use](#How-to-get-a-local-copy)
* [List of Endpoints](#Routes)
* [Running Tests](#Running-Tests)
* [Credits](#Credits)
* [Contributor(s)](#Contributor(s))
* [Author(s)](#Author(s))

#### Technologies
This Project was created with:
- HTML - A markup language
- Cascading Stylesheet(CSS)
- JavaScript - Development Language
- NodeJS - A javascript server-side engine
- Express Library - A library built on Node JS
- Cloudinary - A file storage platform
- Pivotal Tracker - A project management platform
- Travis CI - A continuous integration and testing platform
- Coveralls - A continuous integration and testing platform
- Code Climate - A continuous integration and testing platform

#### Tools and Modules
The tools and modules employed in this project are:
- Internet Connection
- Git
- npm
- A test suite e.g Mocha and Chai
- JSON Web Token
- Multer
- swaggerUI
- bcryptjs
- JOI validation module

#### Development Setup
To start this project, install the required modules and dependencies locally using npm:
##### Usage Example
```
cd Desktop
mkdir Property-Pro-Lite
cd Property-Pro-Lite
git init
touch package.json
npm init --yes
npm install express
npm start
```

#### Template URL
- https://sebaztyn.github.io/EPIC-Mail/UI/index.html

#### API URL
- https://property-pro-lite-andela.herokuapp.com/

#### API Documentation
-  https://property-pro-lite-andela.herokuapp.com/api-docs

#### User Access
Signing into the property-pro-lite platform will require a login details as:
- email: johndoe@johndoe.com
- password: Password123!

#### How to get a local copy and Use
**Clone repository**
- copy the link to the project from github website
- create a folder on local machine
- cd in to the folder and call a git init
- git clone repository
- npm install to install development dependencies


#### Endpoints
- GET https://property-pro-lite-andela.herokuapp.com/ - A visit to the endpoints' homepage
- GET https://property-pro-lite-andela.herokuapp.com/api-docs - A visit to the API Documentation page

- POST https://property-pro-lite-andela.herokuapp.com/api/v1/property - This is an endpoint that allows for posting a property advert

- GET https://property-pro-lite-andela.herokuapp.com/api/v1/property - A visit to endpoint returns all advertised properties

- DELETE https://property-pro-lite-andela.herokuapp.com/api/v1/property/1 - A visit to endpoint deletes a property advert with id number 1 and returns a success message if successful or failure message if not successful
- GET https://property-pro-lite-andela.herokuapp.com/api/v1/property?type=2-bedroom - A visit to endpoint returns an array of all property adverts of property type 2-bedroom.

- GET https://property-pro-lite-andela.herokuapp.com/api/v1/property/4 - A visit to endpoint returns the property advert with id number 4.

- PATCH https://property-pro-lite-andela.herokuapp.com/api/v1/property/4 - A visit to endpoint enables for updating property advert with id number 4.

- PATCH https://property-pro-lite-andela.herokuapp.com/api/v1/property/5/sold - A visit to endpoint marking of property advert with id number 5 as been sold and therefore unavailable to other users and visitors.

- POST https://property-pro-lite-andela.herokuapp.com/api/v1/auth/signup - A visit to endpoint creates a new user and returns a signup token.

- POST https://property-pro-lite-andela.herokuapp.com/api/v1/auth/signin - A visit to endpoint allows an already registered user to login on providing matching credientials with what is saved in the database.


#### Running Tests
Tests are run by calling ```npm test``` after installing and setting up testing suites:
- Mocha
- Chai
- Chai HTTP
##### Usage Example
```
  Testing endpoints
    √ It should post new user data to the database (1275ms)
    √ It allow user saved in the database access to the login page (655ms)
```
#### Credits
I learnt cloudinary usuage and file upload in express js reading the article from [Okpukoro Joe](https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54)

#### Contributor(s)
- Chima Ekeneme Sebastine

#### Author(s)
- Chima Ekeneme Sebastine
