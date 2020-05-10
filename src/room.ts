import IPFS from 'ipfs'
import cbor from 'borc'

const PEER_WSS = "/dns4/node.fission.systems/tcp/4003/wss/ipfs/QmVLEz2SxoNiFnuyLpbXsH6SvjPTrHNMU88vCQZyhgBzgw"

let roomName: string
let ipfs: any

export const connect = async (_roomName: string, name: string) => {
  roomName = _roomName

  ipfs = await IPFS.create({ config: { Addresses: { Swarm: [] } } })
  await ipfs.swarm.connect(PEER_WSS)
  await ipfs.swarm.connect(PEER_WSS)

  ipfs.pubsub.subscribe(roomName, async (msg: any) => {
    console.log("MSG: ", msg)
    console.log("decoded: ", cbor.decode(msg.data))
    console.log('peers', await ipfs.pubsub.peers(roomName))
  })
  ipfs.pubsub.publish(roomName, connectMsg(name))
}

export const connectMsg = (name: string) => {
  const msg = {
    type: MsgType.Connect,
    name
  }
  return cbor.encode(msg)
}

enum MsgType {
  Connect = 'connect'
}


export default {
  connect
}
