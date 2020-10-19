const fetch = require('node-fetch')
const slackString = process.argv[2]
console.log(slackString)

function postMessageToSlack (slackString) {
    const slackMsg = async () => {
      try {
        const slackResponse = await fetch(slackString)
        if (slackResponse.status === 200) {
          console.log(slackResponse.status)
        } else {
          console.log(slackResponse.status)
        }
      } catch(error) {
        console.log(error)
      }
    }
    slackMsg()
}

postMessageToSlack(slackString)