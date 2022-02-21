'use strict'

// const createNode = require('./create-node')
import { create } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001


import { fromString } from 'uint8arrays/from-string'
import { toString } from 'uint8arrays/to-string'

async function main () {
  const ipfs = create()
  //const ipfs = await createNode()

  console.log('\nStart of the example:')

  const someData = fromString('capoeira')
  const pbNode = {
    Data: someData,
    Links: []
  }

  const pbNodeCid = await ipfs.dag.put(pbNode, {
    storeCodec: 'dag-pb',
    hashAlg: 'sha2-256'
  })

  const myData = {
    name: 'David',
    likes: ['js-ipfs', 'icecream', 'steak'],
    hobbies: [pbNodeCid]
  }

  const cborNodeCid = await ipfs.dag.put(myData, {
    storeCodec: 'dag-cbor',
    hashAlg: 'sha2-512'
  })

  const result = await ipfs.dag.get(cborNodeCid, {
    path: 'hobbies/0/Data'
  })

  console.log(toString(Uint8Array.from(result.value)))
}

main()
