FROM node:22.14.0

RUN mkdir -p /bugpilot

WORKDIR /bugpilot

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000
