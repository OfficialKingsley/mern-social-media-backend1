FROM node:slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY .
EXPOSE 3000

# Trying to install jenkins on system and not working
