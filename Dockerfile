FROM node:14.18-alpine

ENV DEPLOY_ENV="dev"

EXPOSE 3000

COPY start.sh /start.sh

RUN chmod +x /start.sh

RUN npm i -g @nestjs/cli \
    && npm i --save pg

WORKDIR /var/www

RUN nest new .

ENTRYPOINT ["/start.sh"]
