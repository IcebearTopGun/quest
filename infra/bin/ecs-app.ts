import * as cdk from 'aws-cdk-lib';
import { EcsStack } from '../lib/ecs-stack';
import { Ec2Stack } from "../lib/ec2-stack";
import {VpcStack} from "../lib/shared-vpc";

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});

new EcsStack(app, 'EcsStack', {
    vpc: vpcStack.vpc,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});

new Ec2Stack(app, 'Ec2Stack', {
    vpc: vpcStack.vpc,
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});
