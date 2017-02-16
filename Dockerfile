# use latest Node LTS (Boron)
FROM node:boron

# install Firebase Admin
RUN npm install firebase-admin --save