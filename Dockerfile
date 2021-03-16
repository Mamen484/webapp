## We use this configuration to get a kubernetes build on a testing environment.

## Step 1: install Crowdin and download translations
FROM openjdk:7 as java
WORKDIR /locale
RUN  apt-get update -y && \
 wget -qO - https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | apt-key add - && \
 echo "deb https://artifacts.crowdin.com/repo/deb/ /" > /etc/apt/sources.list.d/crowdin.list && \
 apt-get install apt-transport-https -y && \
 apt-get update -y && apt-get install crowdin -y
COPY crowdin.yaml /locale
RUN mkdir src
RUN touch src/messages.xlf


# Step 2: build an angular application
FROM node:12 as node

WORKDIR /var/www
COPY ./ /var/www

# Install app dependencies
RUN yarn install

# Serve web app
CMD ["npm", "run", "docker-start"]
