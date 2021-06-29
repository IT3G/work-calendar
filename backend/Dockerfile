FROM node:14.17

WORKDIR /usr/src/app

# optionally if you want to run npm global bin without specifying path
# ENV PATH=$PATH:/home/node/.npm-global/bin 
# Set the user to use when running this image
#USER node

RUN ls -la

COPY . .

ENV DISPLAY :99
ARG DEBIAN_FRONTEND="noninteractive"

RUN apt-get update
RUN apt-get install -y --no-install-recommends xvfb chromium
RUN rm -rf /var/lib/apt/lists/*

EXPOSE 3000

RUN chmod 755 entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

