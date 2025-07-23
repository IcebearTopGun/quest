import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';


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
            'selfSignedCertficate',
            'arn:aws:acm:us-east-1:085608568682:certificate/cbc0f4e2-91ed-48f0-beb6-4f86797e6cb4'
        );

        new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'QuestService', {
            cluster,
            taskImageOptions: {
                image: ecs.ContainerImage.fromAsset('../app'),
                containerPort: 3000,
                environment: {
                    SECRET_WORD: 'Naruto',
                },
            },
            desiredCount: 3,
            publicLoadBalancer: true,
            certificate: certificate,
            listenerPort: 443,
            redirectHTTP: true,
        });

    }
}
