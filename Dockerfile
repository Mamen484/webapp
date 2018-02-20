FROM node:9.1
FROM java:8

WORKDIR /var/www

#install crowdin-cli
RUN  apt-get update && \
 wget -qO - https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | apt-key add - && \
 echo "deb https://artifacts.crowdin.com/repo/deb/ /" > /etc/apt/sources.list.d/crowdin.list && \
 apt-get install apt-transport-https && \
 apt-get update && apt-get install crowdin && \
 apt-get install npm

# Install app dependencies
CMD ["npm", "run", "docker-start"]