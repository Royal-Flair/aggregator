const webPush = require('web-push')
const announcements = require('../../components/Content/Announcements');

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

const Notification = (req, res) => {
  if (req.method == 'POST') {
    const { subscription } = req.body

    webPush
      .sendNotification(
        subscription,
        JSON.stringify({ title: 'By: Wanderers', message: 'Please Note: Wanderers is currently not available for public play as it is still in its alpha development phase. We are excited to announce that the first round of closed beta testing will begin at the end of Q1 2024. To participate in the closed beta, players must either be holding a RAM Bundle or have a beta code. Stay tuned on X and in Discord for updates.' })
      )
      .then(response => {
        res.writeHead(response.statusCode, response.headers).end(response.body)
      })
      .catch(err => {
        if ('statusCode' in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body)
        } else {
          console.error(err)
          res.statusCode = 500
          res.end()
        }
      })
  } else {
    res.statusCode = 405
    res.end()
  };
};

export default Notification;