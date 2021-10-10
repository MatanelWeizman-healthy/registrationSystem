FROM node:14
ENV APP_NAME=messagesService HOME=/${APP_NAME} RUN_FROM_DOCKER=true
WORKDIR /${APP_NAME}
ARG NPM_TOKEN=
RUN cd /${APP_NAME} &&\
    echo  "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> ${HOME}/.npmrc && \
    npm install &&\
    rm -rf .npmrc .cache
COPY package*.json ./
COPY . .
CMD [ "npm", "start" ]