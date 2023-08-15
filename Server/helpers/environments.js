/* 
  Title : Environments variable
  Description : Handle all environments thing
  Author : Aritra Pal
  Date : 15/11/2022 
*/
//dependencies

//module scaffolding
const environments = {};

//For Staging
environments.staging = {
  port: process.env.PORT || 4000,
  envname: "staging",
  secretKey: process.env.SECRET_KEY_S,
  maxChecks: 5,
  twilio: {
    from: "+18145594758",
    accountSid: process.env.ACCOUNT_SID_S,
    authToken: process.env.AUTHTOKEN_S,
  },
};

//For Production
environments.production = {
  port: process.env.PORT || 4000,
  envname: "production",
  secretKey: process.env.SECRET_KEY_P,
  maxChecks: 5,
  twilio: {
    from: "+18145594758",
    accountSid: process.env.ACCOUNT_SID_P,
    authToken: process.env.AUTHTOKEN_P,
  },
};

//getting the current environment
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//checking which environment to export
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

//exporting
module.exports = environmentToExport;
