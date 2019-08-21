// export default {
//   MAX_ATTACHMENT_SIZE: 5000000,
//   s3: {
//     REGION: "us-east-1",
//     BUCKET: "notes-app-uploads"
//   },
//   apiGateway: {
//     REGION: "us-east-1",
//     URL: "https://5by75p4gn3.execute-api.us-east-1.amazonaws.com/prod"
//   },
//   cognito: {
//     REGION: "us-east-1",
//     USER_POOL_ID: "us-east-1_udmFFSb92",
//     APP_CLIENT_ID: "4hmari2sqvskrup67crkqa4rmo",
//     IDENTITY_POOL_ID: "us-east-1:ceef8ccc-0a19-4616-9067-854dc69c2d82"
//   }
// };

const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "ticnsp-automations-api-dev-attachmentsbucket-nl2hzz2mnbpt"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://xn9umfw858.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_mLltkCV2R",
    APP_CLIENT_ID: "5rp9oou6j6hp93uhb8b4jiqtgu",
    IDENTITY_POOL_ID: "us-east-1:01b32811-2897-45b4-b31b-e0455ef42113"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "ticnsp-automations-api-dev-attachmentsbucket-nl2hzz2mnbpt"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://xn9umfw858.execute-api.us-east-1.amazonaws.com/dev/"
  },
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};