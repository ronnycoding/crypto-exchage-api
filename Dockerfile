FROM node:latest

RUN npm i -g @nestjs/cli \
    && npm i --save pg sqlite3 mysql @adonisjs/ignitor

WORKDIR /var/www

RUN nest new .

ENV HOST=0.0.0.0

ENV PORT=80

CMD ["npm","start"]
