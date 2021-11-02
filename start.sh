#!/bin/sh
cd /var/www

if [ "$DEPLOY_ENV" = 'prod' ]; then
    echo "Running environment prod scripts"
        npm install
        npm run build
        npm run start:prod
    exit
elif [ "$DEPLOY_ENV" = 'dev' ]; then
    echo "Running environment dev scripts"
        npm install
        npm run start:dev
    exit
else
    echo "Should set a DEPLOY_ENV env variable"
    exit
fi