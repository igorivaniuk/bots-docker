FROM node:7

# Create app directory
RUN mkdir -p /usr/app

WORKDIR /usr/app
COPY . /usr/app/

RUN npm i

EXPOSE 80
CMD [ "node", "index.js" ]