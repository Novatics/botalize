## Create and setup your Facebook Messenger Bot with API.AI, Node.js and Mongo.db

The purpose of this repo is to provide instructions for how to setup a [Facebook Messenger
Chatbot](https://developers.facebook.com/docs/messenger-platform) using
[API.AI](https://api.ai/), [Node.js](https://nodejs.org) and
[Mongo.db](https://www.mongodb.com/). If you have any question or
suggestions, feel free to create an issue.


### Overview

In this tutorial the API.AI is used as your NLP (Natural Language Processor) and Node.js for backend operations that can't be done with API.AI. If you don't have any backend operation, just ignore the Node.js/Mongo.db sections.

The following picture shows an architectural overview of how the full example will
operate. The API.AI interacts directly with the Facebook Messenger Platform, while
the Node.js server will only interact directly to the Messenger Platform if
notification messages are required.


![alt text](https://github.com/Novatics/botalize/raw/master/images/overview.png "Facebook App")

### Setup the Facebook App

1. Create your Facebook App at <https://developers.facebook.com/apps>

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/create-app-facebook.png "Facebook App")

2. Go to the Messenger tab and select your Facebook Page to generate an Page
Access Token. Make sure to save it somewhere.

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

### <a name="apiai"></a> Setup API.AI

1. Create an account at [API.AI](https://api.ai/), and create your first Agent.
For more info about API.AI, check their [documentation](https://api.ai/docs/getting-started/basics).

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/api-ai-intent.png "Facebook App")

2. Go to Integrations tab and setup the *Facebook messenger One-click integration*. The
*Verify Token* can be any string, and the *Page Access Token* is the token generated at
your *Facebook App*.

    ![alt text](https://github.com/Novatics/botalize/raw/master/images/api-ai-facebook.png "Facebook App")

### <a name="nodejs"></a> Setup Node.js server
#### TODO
