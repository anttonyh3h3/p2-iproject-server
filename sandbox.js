// const axios = require("axios");

// const testApi = () => {
//   let agentsData = []

//   axios({
//     url: "https://valorant-api.com/v1/agents?isPlayableCharacter=true",
//     method: "GET"
//   })
//   .then(response => {
//     // console.log(response.data.data);
//     // console.dir(response.data, { depth: null })
//     // console.log(response.data.data[0].role.uuid);
//     response.data.data.forEach(e => {
//       let agentDetail = {}

//       agentDetail.uuid = e.uuid
//       agentDetail.name = e.displayName
//       agentDetail.role_uuid = e.role.uuid

//       agentsData.push(agentDetail)
//     });
    
//     console.log(agentsData);
//   })
//   .catch(error => {
//     console.log(error);
//   })
// }

// testApi()

// require('dotenv').config();

// const secretKey = process.env.SECRET_KEY

// console.log(secretKey);

const { v4 } = require("uuid")

const uuid = v4()

console.log(typeof uuid);