# First Serverless Project
- Author : [Seolhun](https://github.com/Seolhun)
- Started_Date : 2018-02-23

## Intro
- AWS API-Gateway
- AWS Lambda
- AWS DynamoDB

# Serverless Example
- Author : [SeolHun](https://github.com/Seolhun/)

## 1. Create Template
- `sls -t template aws-nodejs`

- functions handler.`hello` 와 module.exports.`hello`를 맞춘다.	
```javascript
module.exports.hello = (event, context, callback) => {}
```
```yaml
functions:
  hello:
    handler: handler.hello
```

- Options
	- `-f` : function
	- `-d` : post event with parameter
	- `-s` : stage

## 2. Juest Local Test
- Local Test 1
  - `sls invoke local -f hello`
- Local Test 2
  - `sls invoke local -f hello -d "What is World"`

## 3.  Local Test with Serverless-Offline
- Serverless Offline Plugin 추가
```yaml
plugins:
  - serverless-offline
```
- Local Test 3
  - `serverless offline`

## 4. Deploy 
- sls deploy
- Function
  - sls deploy -f hello
- Function & Stage
  - sls deploy -f hello -s production
- AWS-Profile
  - sls deploy -f hello -s production --aws-profile hunseol

## 5. Remove 
- Stage
  - sls remove dev
  - sls remove production
- Function
  - sls remove -f hello