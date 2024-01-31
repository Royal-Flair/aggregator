import { useEffect, useState } from 'react'
import Head from 'next/head'
import Home from '../test'

const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const Index = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [])

  const subscribeButtonOnClick = async event => {
    event.preventDefault()
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub)
    setIsSubscribed(true)
    console.log('web push subscribed!')
    console.log(sub)
  }

  const unsubscribeButtonOnClick = async event => {
    event.preventDefault()
    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null)
    setIsSubscribed(false)
    console.log('web push unsubscribed!')
  }

  const sendNotification = async (delayInSeconds) => {
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    // Calculate the time to schedule the notification
    const scheduledTime = new Date(Date.now() + delayInSeconds * 1000)

    // Send the notification with the scheduled time
    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription,
        scheduledTime
      })
    })
  }

  return (
    <>
      <Head>
        <title>Keepup</title>
      </Head>
      <center>
        <button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
          Subscribe
        </button><br />
        <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
          Unsubscribe
        </button><br />
        <button onClick={() => sendNotification(10)} disabled={!isSubscribed}>
          Send Notification
        </button><br />
        <button onClick={() => sendNotification(10)} disabled={!isSubscribed}>
          Send Reminder in 10 Seconds
        </button><br />
        <button onClick={() => sendNotification(18)} disabled={!isSubscribed}>
          Send Reminder in 18 Seconds
        </button><br />
        <button onClick={() => sendNotification(24)} disabled={!isSubscribed}>
          Send Reminder in 24 Seconds
        </button>
      </center>
      <Home />
    </>
  )
}

export default Index;
