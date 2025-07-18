FROM node:18-alpine
WORKDIR /app

# Required for git-based dependencies (even over HTTPS)
RUN apk add --no-cache git

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "--inspect=0.0.0.0:9229", "src/app.js"]
