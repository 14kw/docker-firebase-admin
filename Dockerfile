# use latest Node LTS (Boron)
FROM node:boron

RUN \
	mkdir -p /aws && \
	apk -Uuv add groff less python py-pip && \
	pip install awscli && \
	apk --purge -v del py-pip && \
	rm /var/cache/apk/*

RUN cd /opt && git clone https://github.com/14kw/docker-firebase-admin.git
RUN cd /opt/docker-firebase-admin && npm install