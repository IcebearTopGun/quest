import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';

import * as logs from 'aws-cdk-lib/aws-logs';


export interface EcsStackProps extends cdk.StackProps {
    vpc: ec2.IVpc;
}

export class EcsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: EcsStackProps) {
        super(scope, id, props);

        const vpc = props.vpc;
        const cluster = new ecs.Cluster(this, 'QuestCluster', {vpc});
        const certificate = certificatemanager.Certificate.fromCertificateArn(
            this,
            'certificate',
            'arn:aws:acm:us-east-1:335746353248:certificate/33cbc019-0e86-4693-8bb9-52bb54e7b5e0'
        );
        const logGroup = new logs.LogGroup(this, 'QuestLogGroup', {
            retention: logs.RetentionDays.ONE_DAY,
        });

        new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'QuestService', {
            cluster,
            taskImageOptions: {
                // image: ecs.ContainerImage.fromRegistry("dummy"),
                image: ecs.ContainerImage.fromAsset('../app'),
                containerPort: 3000,
                environment: {
                    SECRET_WORD: 'Naruto',
                },
                logDriver: ecs.LogDrivers.awsLogs({
                    streamPrefix: 'quest-app',
                    logGroup: logGroup,
                }),
            },
            desiredCount: 3,
            publicLoadBalancer: true,

            certificate: certificate,
            listenerPort: 443,
            redirectHTTP: true
        });

    }
}
