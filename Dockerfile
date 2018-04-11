FROM finanzcheck/docker-node-java

#install crowdin-cli
RUN  apt-get update && \
 wget -qO - https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | apt-key add - && \
 echo "deb https://artifacts.crowdin.com/repo/deb/ /" > /etc/apt/sources.list.d/crowdin.list && \
 apt-get install apt-transport-https && \
 apt-get update && apt-get install crowdin

WORKDIR /var/www

# Install app dependencies
CMD ["npm", "run", "docker-start"]