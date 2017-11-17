FROM node:9.1

WORKDIR /var/www

#install crowdin-cli
RUN  apt-get update && \
     apt-get install -y build-essential ruby ruby-dev && \
     gem install crowdin-cli && \
     apt-get clean && \
     rm -rf /var/lib/apt/lists/*

# Install app dependencies
CMD ["npm", "run", "docker-start"]