#image 
FROM node:lts-alpine3.20

#repertoire
WORKDIR /www

#  Copier le package.json et le package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste de l'application
COPY ./src ./src

# demarrer l'application: node server.js
CMD ["npm","start"]
