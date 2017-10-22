FROM node:latest

WORKDIR /var/www

#install crowdin-cli
RUN  apt-get update && \
     apt-get install build-essential &&  \
     apt-get update && \
     apt-get install -y ruby ruby-dev && \
     gem install crowdin-cli