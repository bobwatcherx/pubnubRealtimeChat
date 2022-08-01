import PubNub from 'pubnub';

export const pubnub = new PubNub({
  publishKey : "pub-c-07314be5-fac7-4a58-92e8-19110a224c48",
  subscribeKey : "sub-c-7a31831d-ca2a-4b9e-8e39-e65fefa7a2a2",
  uuid: "myUniqueUUID"
})