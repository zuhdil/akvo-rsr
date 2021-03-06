#!/usr/bin/env bash

set -eu

function log {
   echo "$(date +"%T") - BUILD INFO - $*"
}

export PROJECT_NAME=akvo-lumen

if [[ "${TRAVIS_BRANCH}" != "develop" ]] && [[ "${TRAVIS_BRANCH}" != "master" ]]; then
    exit 0
fi

if [[ "${TRAVIS_PULL_REQUEST}" != "false" ]]; then
    exit 0
fi

log Preparing deploy info file
echo "DEPLOY_COMMIT_FULL_ID = '`git rev-parse HEAD`'" > ._66_deploy_info.conf
echo "DEPLOY_COMMIT_ID = '`git rev-parse --short HEAD`'" >> ._66_deploy_info.conf
echo "DEPLOY_BRANCH = '$TRAVIS_BRANCH'" >> ._66_deploy_info.conf
echo "DEPLOY_TAG = '$TRAVIS_TAG'" >> ._66_deploy_info.conf

log Creating Production Backend image
docker build --rm=false -t eu.gcr.io/${PROJECT_NAME}/rsr-backend:${TRAVIS_COMMIT} .
docker tag eu.gcr.io/${PROJECT_NAME}/rsr-backend:${TRAVIS_COMMIT} rsr-backend:develop

log Creating Production Nginx image
docker build nginx/ -t eu.gcr.io/${PROJECT_NAME}/rsr-nginx:${TRAVIS_COMMIT}

log Creating statsd to prometheus
docker build -t "eu.gcr.io/${PROJECT_NAME}/rsr-statsd-to-prometheus:${TRAVIS_COMMIT}" statsd-to-prometheus

log Making sure gcloud and kubectl are installed and up to date
gcloud components install kubectl
gcloud components update
gcloud version
which gcloud kubectl

log Authentication with gcloud and kubectl
openssl aes-256-cbc -K $encrypted_12c8071d2874_key -iv $encrypted_12c8071d2874_iv \
	-in ci/gcloud-service-account.json.enc -out ci/gcloud-service-account.json -d
gcloud auth activate-service-account --key-file ci/gcloud-service-account.json
gcloud config set project akvo-lumen
gcloud config set container/cluster europe-west1-d
gcloud config set compute/zone europe-west1-d
gcloud config set container/use_client_certificate True

if [[ "${TRAVIS_BRANCH}" == "master" ]]; then
    log Environment is production
    gcloud container clusters get-credentials production
else
    log Environement is test
    gcloud container clusters get-credentials test
fi

log Pushing images
gcloud auth configure-docker
docker push eu.gcr.io/${PROJECT_NAME}/rsr-backend
docker push eu.gcr.io/${PROJECT_NAME}/rsr-nginx
docker push eu.gcr.io/${PROJECT_NAME}/rsr-statsd-to-prometheus

sed -e "s/\${TRAVIS_COMMIT}/$TRAVIS_COMMIT/" ci/k8s/deployment.yml > deployment.yml.tmp

kubectl apply -f ci/k8s/media-disk.yml
kubectl apply -f ci/k8s/service.yml
kubectl apply -f deployment.yml.tmp

log Waiting for k8s to finish
./ci/k8s/helpers/wait-for-k8s-deployment-to-be-ready.sh