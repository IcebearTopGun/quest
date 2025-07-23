import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';

export interface Ec2StackProps extends cdk.StackProps {
    vpc: ec2.IVpc;
}

export class Ec2Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: Ec2StackProps) {
        super(scope, id, props);

        const vpc = props.vpc;

        const ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SG', {
            vpc,
            description: 'Allow HTTP/HTTPS from ALB only',
            allowAllOutbound: true,
        });

        const albSecurityGroup = new ec2.SecurityGroup(this, 'ALBSG', {
            vpc,
            description: 'Public access for HTTP/HTTPS',
            allowAllOutbound: true,
        });

        albSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP');
        albSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow HTTPS');

        ec2SecurityGroup.addIngressRule(albSecurityGroup, ec2.Port.tcp(80), 'Allow HTTP from ALB');

        const role = new iam.Role(this, 'EC2Role', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'),
            ],
        });

        const cert = certificatemanager.Certificate.fromCertificateArn(
            this,
            'certificate',
            'arn:aws:acm:us-east-1:085608568682:certificate/cbc0f4e2-91ed-48f0-beb6-4f86797e6cb4'
        );

        const ami = ec2.MachineImage.latestAmazonLinux2023();

        const userData = ec2.UserData.forLinux();
        // userData.addCommands(
        //     'docker run -t 3000:3000 quest'
        // );
        userData.addCommands(
            'yum update -y',
            'yum install -y docker',
            'service docker start',
            'systemctl enable docker',
            'yum install -y awscli',
            'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 085608568682.dkr.ecr.us-east-1.amazonaws.com',
            'docker pull 085608568682.dkr.ecr.us-east-1.amazonaws.com/cdk-hnb659fds-container-assets-085608568682-us-east-1:28ddf73f9050949d28bfe17395f235cbde6b083f4d0cd6d5f74173b253c941d1',
            'docker run -d -p 80:3000 -e SECRET_WORD=GOKU 085608568682.dkr.ecr.us-east-1.amazonaws.com/cdk-hnb659fds-container-assets-085608568682-us-east-1:28ddf73f9050949d28bfe17395f235cbde6b083f4d0cd6d5f74173b253c941d1'
        );

        const questInstance = new ec2.Instance(this, 'QuestInstance', {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            machineImage: ami,
            securityGroup: ec2SecurityGroup,
            role: role,
            userData: userData,
        });

        const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
            vpc,
            internetFacing: true,
            securityGroup: albSecurityGroup,
        });


        alb.addListener('HTTPListener', {
            port: 80,
            defaultAction: elbv2.ListenerAction.redirect({
                protocol: 'HTTPS',
                port: '443',
            }),
        });

        const httpsListener = alb.addListener('HTTPSListener', {
            port: 443,
            certificates: [cert],
        });

        httpsListener.addTargets('EC2Target', {
            port: 80,
            targets: [new targets.InstanceTarget(questInstance)],
            healthCheck: {
                path: '/',
                port: '80',
            },
        });

        new cdk.CfnOutput(this, 'LoadBalancerDNS', {
            value: alb.loadBalancerDnsName,
        });
    }
}
