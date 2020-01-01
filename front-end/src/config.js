export default {
  s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://flqg42dn92.execute-api.us-east-1.amazonaws.com/development"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_nycuHLgAQ",
    APP_CLIENT_ID: "3qq53ble2jl5tu87fe3pqlje2h",
    IDENTITY_POOL_ID: "us-east-1:094ddf31-9ba6-46fe-b172-9c800b13b7a4"
  },
  app: {
    dateFormat: 'YYYY/MM/DD',
    dateTimeFormat: 'YYYY/MM/DD HH:mm:SS',
    datepickerDateFormat: 'yyyy/MM/dd'
  }
};
