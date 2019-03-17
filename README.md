# My Profile
Portal to showcase skills and experience

Libraries used:
React, Webpack, SASS

Platform:
NODE, NPM

Running App (Demo): Work in progress

Steps to install and run locally:

    git clone https://github.com/vikaskulkarni/myProfile.git
    cd myProfile
    npm install

    cd myProfile/client
    npm install
  
Development Mode

    npm install webpack-dev-server -g
    cd myProfile
    npm run start-dev
  
Navigate to http://localhost:65132/. In this mode, the code changes are automatically loaded. Make sure the underlying service layer is running on 3001 that serves the APIs


Looking at the project structure:

Client (myProfile/client)
    components

        This contains the reusable components like header, footer, table, search. These are standalone components that can be used by any pages by passing required props.

    containers

        This contains the Application container, App.jsx that embeds all the required components to design the page. The application has;
        - header

    service

        This is common api layer that uses 'axios' library to make server calls

Server (myProfile/server)
    server.js

        This is the main entry point for the server code and contains all the REST end points required by the client
        
    entities

        This contains the schemas for handling mongodb models
        
For Database, Mongo is used as a service through https://www.mlab.com/
