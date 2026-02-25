# classic docker node backend setup template may be 
# used for learning and development purposes.

# Use an official Node.js runtime as a parent image
# will discuss each keyword used in every line nd wt it refers to 
FROM node:14
# from means we are using the node image from docker hub and 14 is the version of node js we want to use
# once the node is setup we will have access to all the node modules and npm commands
# we ll go to next step which is to set the working directory in the container
WORKDIR /app
# this means that we are setting the working directory to /app in the container - /app is in the container not to our current root\
# now we will copy the package.json and package-lock.json files to the container
COPY package*.json ./
# ./ means we are copying the files to the current working directory which is /app in the container
# now we will install the dependencies in the container
RUN npm install
# this will run the npm install command in the container and install all the dependencies listed in the package.json file
# now we will copy the rest of the application code to the container
COPY . .
# this will copy all the files from our current directory to the /app directory in the container
# now we will expose the port that our application will run on
EXPOSE 3000
# this will expose port 3000 in the container so that we can access our application from outside the container
# now we will define the command to run our application
CMD ["npm", "start"]
# this will run the npm start command in the container which will start our application


# to build the docker image we will run the following command in the terminal
# docker build -t my-node-app .
# this will build the docker image and tag it as my-node-app
# to run the docker container we will run the following command in the terminal
# docker run -p 3000:3000 my-node-app
# this will run the docker container and map port 3000 in the container to port 3000 on our host machine so that we can access our application at http://localhost:3000

# we will see frontend reactjs template now 

FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# which is basically the same as the backend template but we will be using it for a reactjs frontend application instead of a node backend application


# a microservice of database mysql template may be
FROM mysql:latest
# this will use the latest version of mysql image from docker hub
# we will set the environment variables for mysql
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword
# these environment variables will be used to set up the mysql database with a root password, a database name, a user and a password for that user
# we will expose the default mysql port
EXPOSE 3306
# this will expose port 3306 in the container so that we can access the mysql database from outside the container
# we will not define a command to run the mysql database as it will automatically start when the container is run   

# for mongodb we can use the official mongo image from docker hub and set the environment variables for mongo
FROM mongo:latest
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=rootpassword
ENV MONGO_INITDB_DATABASE=mydatabase
EXPOSE 27017

# classic template for any service includes in a dockerfile below
FROM  
WORKDIR
COPY
RUN
EXPOSE
CMD

# redis 
FROM redis:latest
EXPOSE 6379

# rabbitmq
FROM rabbitmq:latest
EXPOSE 5672



