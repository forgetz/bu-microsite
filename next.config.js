module.exports = {
  reactStrictMode: true,
  env: {
    PUBNUB_PUBLISH_KEY: process.env.PUBNUB_PUBLISH_KEY,
    PUBNUB_SUBSCRIBE_KEY: process.env.PUBNUB_SUBSCRIBE_KEY, 
    PUBNUB_UUID: process.env.PUBNUB_UUID,
    PUBNUB_SECRET_KEY: process.env.PUBNUB_SECRET_KEY,
  },
}
