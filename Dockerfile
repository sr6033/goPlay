FROM mhart/alpine-node:4.4 

#Create the npm install layer independently 
RUN mkdir /app 
COPY app/package.json /app 

# Add app source files 
ADD app /app/ 

RUN cd /app && npm install 

WORKDIR /app 
ENV NODE_ENV production 
CMD ["npm", "run", "start"]
