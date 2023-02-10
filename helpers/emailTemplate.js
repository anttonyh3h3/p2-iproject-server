const userTemplate = (user, coach, date) => {
  return `
Hi ${user},

Your coaching session with ${coach} on ${date} is scheduled,
please join our discord server for the coaching session with the link below

https://discord.gg/EqhKt85zWS

for further information contact us at ant_tonyyy@protonmail.com

note:
please join the discord at least 2 days before the sessiond date so we can prepare everything for you
`
}

const adminTemplate = (user, coach, date, link) => {
  return `
Coaching session for ${user} with ${coach} at ${date} is scheduled.

please send the vod link to ${coach} and prepare the discord for the incoming session.

VOD link:
${link}
`
}

module.exports = { userTemplate, adminTemplate }