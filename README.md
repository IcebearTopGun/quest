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

### API Endpoints ECS

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

### What would I have If I had more time

```
1. EC2 is the working solution for this problem to improve this we can use ECS, I have implemented a very basic ECS exmple too which can be extended
2. I would have worked more on IAM implementing more granular access controls
3. Making service entirely private exposing, using vpce and exposure via api gateway instead of ALB creating public subnet
4. CloudWatch Logs with retention policies  
5. Alerting setup on the cloudwatch metrics and SNS integration for alterting
6. Autoscaling options in case there is overload on the cluster during month ends/quarter ends in case of financial instituions
7. SDLC currently its deployed from my local intellij by triggering cdk commands, directly deploying rom github pipeline 
8. API throttling added with Authentication JWT Token etc tha checks the identity of the user and allows certain number of requests and block if they are increased
9. Drawing an architecture Diagram whould have made things more better
```

### Optional Improvements to Quest
```
1. Task 004-006 just rely on headers so these can be easily exploited
2. There should be a task to test out the IAM since it is one of the important aspect of Cloud Computing
3. The code should be buggy at some places that user has to find and fix would make it more interesting
4. There should be a architecture diagram expected to be submitted with this code
```