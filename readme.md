# Studating

A dating app for the ones seeking for a partner. Made for international students who find it hard to find a partner.

<img src="https://i.ibb.co/pZGHx86/styleguide.jpg" width="400" >


## Wiki

Follow the progress on the [wiki](https://github.com/GiovanniKaaijk/project-tech/wiki).

# Interested? Clone the following on your terminal:

## Before you clone

* Install Node.js
* Install a Code Editor
* An CLI(Command Line Interface) like bash or iTerm

## Used (necessery sources)

* NPM
* PUG
* SCSS
* Express

* Use npm install to install all the packages at once

## Database model

```
_id: (object id, this is generated by mongoose),
likes: Array,
username: String,
email: String,
password: String
profilePic: String (url to image)
```

## Installation

CLI:
```
git clone https://github.com/GiovanniKaaijk/project-tech.git
```

Install used npm packages
```
npm install
```
Create an .ENV file
```
Touch .env
fill in the following:
MONGO_URI= -Your connection URI to mongo- Example: "mongodb+srv://{username}:{password}@ptech-u8ivl.mongodb.net/test?retryWrites=true&w=majority"
PORT= -any port you like, I used 9090 for this project-  
SECRET= -secure session cookies-
```
Run the application
```
npm run dev
```


## The features
- Register
- Log-in
- Session
- Like other users
- Match with other users

## Usage
Start the application
```
node server.js
```
To run nodemon (nodemon will run server.js each time the file changes)
```
npm run dev
```
## Keep up to date
Make sure you pull the repository once in a while since we are still working on this project, you can do this by using ```git pull```

## Contributor
When having problems, you can contact the contributor:
- [Giovanni Kaaijk](https://github.com/GiovanniKaaijk)

# License
[MIT](https://github.com/rico1136/Project_Tech/blob/master/LICENSE)
