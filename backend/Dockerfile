FROM node:12

WORKDIR /usr/src/app

# optionally if you want to run npm global bin without specifying path
# ENV PATH=$PATH:/home/node/.npm-global/bin 
# Set the user to use when running this image
#USER node

RUN ls -la

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:nodeserver" ]
