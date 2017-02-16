# use latest Node LTS (Boron)
FROM node:boron

RUN git clone https://github.com/14kw/docker-firebase-admin.git
RUN cd docker-firebase-admin
RUN npm install