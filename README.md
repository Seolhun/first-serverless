# First Serverless Project
- Author : [Seolhun](https://github.com/Seolhun)
- Started_Date : 2018-02-23

## Intro
- AWS API-Gateway
- AWS Lambda
- AWS DynamoDB

# Serverless Example
- Author : [SeolHun](https://github.com/Seolhun/)

## Create Template
- AWS nodejs 템플릿 만들기 
`sls -t template aws-nodejs`

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
	- `-d` : post event

- Local Test 1
`sls invoke local -f hello`
- Local Test 2
`sls invoke local -f hello -d "What is World"`

- Serverless Offline Plugin 추가
```yaml
plugins:
  - serverless-offline
```
- Local Test 3
`serverless offline`
