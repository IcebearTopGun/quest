# Quest API


### `Problem Statement`

- Deploy an application on AWS exposing user facing endpoints with conditions [Quest Readme](./app/README.md)

---


### API Endpoints EC2 

1. [`Index`](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/) [![Index](infra/output/ec2-index.png)](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/)
2. [`Docker check`](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/docker) [![Docker](infra/output/ec2-docker.png)](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/docker)
3. [`Secret Word check`](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/secret_word) [![Secret](infra/output/ec2-secret-word.png)](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/secret_word)
4. [`Load Balancer check`](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/loadbalanced) [![LB](infra/output/ec2-load-balancer.png)](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/loadbalanced)
5. [`TLS check`](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/tls) [![TLS](infra/output/ec2-tls.png)](https://ec2sta-albae-tkxlrycvxiwa-1658007813.us-east-1.elb.amazonaws.com/tls)

### API Endpoints EC2 

1. [`Index`](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/) [![Index](infra/output/ecs-index.png)](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/)
2. [`Docker check`](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/docker) [![Docker](infra/output/ecs-docker.png)](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/docker)
3. [`Secret Word check`](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/secret_word) [![Secret](infra/output/ecs-secret-word.png)](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/secret_word)
4. [`Load Balancer check`](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/loadbalanced) [![LB](infra/output/ecs-load-balancer.png)](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/loadbalanced)
5. [`TLS check`](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/tls) [![TLS](infra/output/ecs-tls.png)](https://ecssta-quest-u24q9it9unkt-988408755.us-east-1.elb.amazonaws.com/tls)

---

##  How to Deploy
```
1. Create EC2 stack
2. Test your stack using localstack before AWS deployment 
3. Local Stack Community does not support ECR, ApiGateway
    a. Uncomment VPC creation in lib/shared-vps.ts
    b. Uncomment get Image line 28 in lib/ecs-stack/ts 
    c. Uncomment get Image line 52 in lib/ec2-stack/ts 
3. If localstack goes to success, your AWS resoruces will deploy without failure
4. Revert back the commented parts and proceed with AWS deployment
```

```bash
chmod +x localstack.sh
```
```bash
./localstack.sh 
```

```bash
cdk bootstrap
```

```bash
cdk deploy --all
```

### TODO 