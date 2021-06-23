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
RUN apt-get install -y --no-install-recommends xvfb firefox-esr libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev libasound2
RUN rm -rf /var/lib/apt/lists/*

RUN npm i
RUN npm run build:prod

EXPOSE 3000

RUN chmod 755 entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]

