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

require('dotenv').config();

// const secretKey = process.env.SECRET_KEY

// console.log(secretKey);

// const { v4 } = require("uuid")

// let uuids = []
// let flag = false

// for (let i = 0; i < 20; i++) {
//   const uuid = v4()
//   flag = false
//   if (uuids.length > 0) {
//     uuids.forEach(e => {
//       if (e === uuid) {
//         flag = true
//       } else {
//         uuids.push(uuid)
//       }
//     })
//   }
//   console.log(i, flag);
// }

// console.log(uuid);

// const testName = "picha@mail.com"
// const password = "pass"
// let isEmail = false
// let email;
// let username;

// for (let i = 0; i < testName.length; i++) {
//   // console.log(testName[i]);
//   if (testName[i] === "@") {
//     isEmail = true
//   }
// }

// const test = () => {
//   let obj = {}

//   if (isEmail) {
//     obj.email = testName
//     obj.password = password
//     return obj
//   } else {
//     obj.username = testName;
//     obj.password = password
//     return obj
//   }
// }

// console.log(test());

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const sendMail = () => {
  const config = {
    from: process.env.GMAIL_EMAIL,
    to: "muhammadcatur.sp@gmail.com",
    subject: "Nodemailer Test",
    text: "Success send email"
  }

  transport.sendMail(config, (err, info) => {
    if (!err) {
      console.log("Success sent email", info);
    } else {
      console.log(err);
    }
  })
}

sendMail()

// console.log(process.env.XENDIT_API_KEY);