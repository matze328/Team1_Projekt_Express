const AWS = require('aws-sdk');

// Konfiguration des S3-Clients
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-central-1' 
});

// Konfiguration des DynamoDB-Clients
const dynamoDB = new AWS.DynamoDB.DocumentClient();