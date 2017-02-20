# use latest Node LTS (Boron)
FROM node:boron

RUN export AWS_DEFAULT_OUTPUT=json
RUN pip install --upgrade --user awscli

RUN cd /opt && git clone https://github.com/14kw/docker-firebase-admin.git
RUN cd /opt/docker-firebase-admin && npm install