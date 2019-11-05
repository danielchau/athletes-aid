# athletes-aid

## Deploy Procedure 

### Requirements 

**AWS CLI**
```
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
```

**Elastic BeanStalk Cli**
```
brew install awsebcli
```

### Deployment

For deployment use the credentials for the **eb-deploy-user** in AWS

**Initalize EBS**
```
cd athletes-aid/app
eb init
```
**Create an enivroment**

Use ca-central-1 as the region and leave the rest of the options as defaults
```
eb create
```
**Deploy application**
```
npm install
npm run build
eb deploy
```

## DynamoDB
To access DynamoDB a file called **aws.config.js** with amazon credentials needs to created in the **app/** directory

