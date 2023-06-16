FROM node:lts-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
RUN npm run set
CMD ["npm", "run", "go"]
#CMD ["node", "dist/app.js"]
