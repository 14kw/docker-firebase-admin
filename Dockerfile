# use latest Node LTS (Boron)
FROM node:boron

RUN cd /opt && git clone https://github.com/14kw/docker-firebase-admin.git
RUN cd /opt/docker-firebase-admin && npm install