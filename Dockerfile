FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Expose port 3000 for the app to be accessible
EXPOSE 3005

# Define the command to run the app
CMD [ "npm", "start" ]

#docker build -t my-express-app .
#docker run -p 3005:3005 my-express-app