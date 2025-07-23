#!/bin/bash


GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Enter into Infra Directory ${NC}"
cd infra

echo -e "${GREEN}Pulling LocalStack Docker image...${NC}"
docker pull localstack/localstack

echo -e "${GREEN}Running LocalStack container in detached mode...${NC}"
docker run -d --name localstack -p 4566:4566 localstack/localstack

echo -e "${GREEN}Installing aws-cdk-local globally...${NC}"
npm install -g aws-cdk-local

echo -e "${GREEN}Installing AWS CDK globally...${NC}"
npm install -g aws-cdk

echo -e "${GREEN}Bootstrapping CDK for LocalStack...${NC}"
cdklocal bootstrap

echo -e "${GREEN}Deploying CDK stack to LocalStack...${NC}"
cdklocal deploy --all

echo -e "${GREEN}Done! LocalStack is running and CDK stack deployed (if no errors).${NC}"

echo -e "${RED}Destroying CDK stack to LocalStack...${NC}"
cdklocal destroy --all


echo -e "${RED}Stopping Local Stack Container...${NC}"
docker rm -f $(docker ps -aq)

