# Create and setup your Facebook Messenger Bot with API.AI, Node.js and Mongo.db

The purpose of this repo is to provide instructions for how to setup a [Facebook Messenger
Chatbot](https://developers.facebook.com/docs/messenger-platform) using
[API.AI](https://api.ai/), [Node.js](https://nodejs.org) and
[Mongo.db](https://www.mongodb.com/). If you have any question or
suggestions, feel free to create an issue.


## Overview

In this tutorial the API.AI is used as your NLP (Natural Language Processor) and
Node.js for backend operations that can't be done with API.AI. If you don't have
any backend operation, just ignore the Node.js/Mongo.db sections.

The following picture shows an architectural overview of how the full example will
operate. The API.AI interacts directly with the Facebook Messenger Platform, while
the Node.js server will only interact directly to the Messenger Platform if
notification messages are required.


![alt text](https://github.com/Novatics/botalize/raw/master/images/overview.png "Facebook App")

## <a name="facebook"></a> Setup the Facebook App

1. Create your Facebook App at <https://developers.facebook.com/apps>

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/create-app-facebook.png "Facebook App")

2. Go to the Messenger tab and select your Facebook Page to generate an Page
Access Token. Make sure to save it somewhere, as it will be used in your Node.js
sever.

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/page-token-facebook.png "Facebook App")

3. After you have an Page Access Token, **you have** to configure your API.AI webhook to
explore the messenger platform. Head over to [API.AI](https://api.ai/) and follow
the steps at Section [Setup API.AI](#apiai) for how to setup the *Facebook messenger
One-click integration*.

4. Setup the webhook with the **Callback URL** and **Verify Token** from the *Facebook
messenger One-click integration* at your API.AI agent. Make sure to check the
Subscription Fields required for your bot interaction (check *messages* and
*messaging_postbacks* at least).

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/webhook-facebook.png "Facebook App")

5. Select a page to subscribe your webhook to the page events

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/webhook-approved-facebook.png "Facebook App")

## <a name="nodejs"></a> Setup Node.js server

If you don't want to follow this whole section, you can download this repo and
update the environment variables and Heroku informations.

1. First things first. We will use Heroku platform for deployment. As so,
you will need a [Heroku](https://www.heroku.com) account and [Heroku
toolbelt](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
installed locally. You will also need MongoDB to run the server locally.

2. Install [Node](https://nodejs.org/). If you already have it installed,
update npm to the latest version.
    ```
    sudo npm install npm -g
    ```

3. Create your project folder and init a Node project.
    ```
    npm init
    ```

4. Install the extra dependencies. Express for the server, Request for
easy html requests, Body-Parser for message processing, and Mongoose for
data storage.
    ```
    npm install express request body-parser mongoose --save
    ```

5. Create an index.js file and copy the following code:

    ```javascript
    'use strict'

    var express  = require('express');
    var app      = express();
    var port     = process.env.PORT || 5000;

    var mongoose    = require('mongoose');
    var database    = require('./configs/database');

    // Mongoose connection
    mongoose.connect(database[process.env.NODE_ENV].url);

    // Parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({'extended':'true'}));

    // Parse application/json            
    app.use(bodyParser.json());       

    // Parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // Routes
    require('./routes/api-ai.js')(app);

    // Listen (start app with node index.js)
    app.listen(port);
    ```

6. Create an database.js file with the following code inside the directory
/configs. This file uses environment variables to provide the url for the
database.

    ```javascript
    module.exports = {
      development: {
        url: process.env.MONGODB_URI
      },
      staging: {
        url: process.env.MONGODB_URI
      },
      production: {
        url: process.env.MONGODB_URI
      }
    }
    ```  

7. Create an api.ai.js file with the following code inside the directory /routes.
This file contains the webhook endpoint for API.AI, and the index endpoint.

    ```javascript
    module.exports = function(app) {
      // Index route
      app.get('/', function (req, res) {
        res.send('Welcome to the Index Route');
      });
      // API.AI webhook route
      app.post('/webhook/apiai/', function(req, res) {
        // Your code for different actions sent by API.AI
        res.status(200).json('Sucessfull');
      });
    }
    ```

8. Create an Procfile to tell Heroku where the server is.
    ```
    web: node index.js
    ```

9. Setup your local environment variables(MongoDB, Node.js and Facebook Page
Access Token) to test the server locally.
    ```
    export MONGODB_URI = mongodb://localhost/your-bot-database
    export NODE_ENV = development
    export FB_PAGE_ACCESS_TOKEN = YOUR-FACEBOOK-PAGE-ACCESS-TOKEN
    ```

10. Commit all code, install mLab MongoDB, and deploy to Heroku:
    ```
    git init
    git add .
    git commit --message "first commit"
    heroku create app-name
    heroku addons:create mongolab:sandbox
    heroku config:set FB_PAGE_ACCESS_TOKEN=YOUR-FACEBOOK-PAGE-ACCESS-TOKEN
    git push heroku master
    ```    


## <a name="apiai"></a> Setup API.AI

1. Create an account at [API.AI](https://api.ai/), and create your first Agent.
For more info about API.AI, check their [documentation](https://api.ai/docs/getting-started/basics).

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/api-ai-intent.png "Facebook App")

2. Go to Integrations tab and setup the *Facebook messenger One-click integration*.
The *Verify Token* can be any string, and the *Page Access Token* is the token
generated at your *Facebook App*.

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/api-ai-facebook.png "Facebook App")

3. Go to Fulfillment tab and setup the *Webhook* with your Heroku app url endpoint.
After this setup, your can now enable the Webhook option at your intentions.

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/api-ai-webhook.png "Facebook App")


## <a name="mongodb"></a> Using MongoDB
