import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcStack extends cdk.Stack {
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        /**
         * Uncomment below code for localstack testing
         */

        // this.vpc = new ec2.Vpc(this, 'Vpc', {
         //             maxAzs: 1,
         //             natGateways: 0,
         //             subnetConfiguration: [
         //                 {
         //                     name: 'Public',
         //                     subnetType: ec2.SubnetType.PUBLIC,
         //                 },
         //             ],
         //         });

        this.vpc = new ec2.Vpc(this, 'SharedVpc', { maxAzs: 2 });
    }
}
