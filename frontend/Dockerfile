#Pull base image
FROM node:18-alpine

#Set working directory
WORKDIR /code

#Install dependencies
COPY ./package.json .
RUN yarn install

#Expose Port
EXPOSE 5173

#Copy Project 
COPY . .