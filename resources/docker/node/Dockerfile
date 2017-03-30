FROM node:6

RUN npm install -g @angular/cli
RUN npm install

WORKDIR /var/www

CMD ["ng", "serve", "--host", "0.0.0.0"]