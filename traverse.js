'use strict'

// const createNode = require('./create-node')
import { create } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001


import { fromString } from 'uint8arrays/from-string'
import { toString } from 'uint8arrays/to-string'

  const ipfs = create()

async function main () {

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
  console.log(cborNodeCid)
  const result = await ipfs.dag.get(cborNodeCid, {
    path: 'hobbies/0/Data'
  })

  console.log(toString(Uint8Array.from(result.value)))


  const David = {
    name: 'David',
    likes: ['js-ipfs', 'icecream', 'steak'],
    hobbies: [pbNodeCid]
  }
  const cborDavCid = await ipfs.dag.put(David, {
    storeCodec: 'dag-cbor',
    hashAlg: 'sha2-512'
  })


  const John = {
    name: 'John',
    likes: ['js-ipfs', 'icecream', 'steak'],
    knows: [cborDavCid]
  }
  const cborJohnCid = await ipfs.dag.put(John, {
    storeCodec: 'dag-cbor',
    hashAlg: 'sha2-512'
  })

  console.log(cborJohnCid)
  const test = await ipfs.dag.get(cborJohnCid, {
    path: 'knows/0/likes/1'
  })
  console.log(test)
  console.log("first knows of john likes", test.value)


  let r = await ipfs.key.list();
  console.log(r)
        // keys = r.find((k) => k.name == keyName);
        // log(JSON.stringify(keys));


// let keyDav = await createKey("David")
// console.log("keyDav", keyDav)
  const addrD = '/ipfs/'+cborDavCid

  await ipfs.name.publish(addrD, {
      resolve: false,
      key: "David",
    }).then(function (res) {
    // You now receive a res which contains two fields:
    //   - name: the name under which the content was published.
    //   - value: the "real" address to which Name points.
    console.log(res)
    console.log(`David https://gateway.ipfs.io/ipns/${res.name}`)
  })

// let keyJohn = await createKey("John")
  const addrJ = '/ipfs/'+cborJohnCid

  let res = await ipfs.name.publish(addrJ, {
      resolve: false,
      key: "John",
    }).then(function (res) {
    // You now receive a res which contains two fields:
    //   - name: the name under which the content was published.
    //   - value: the "real" address to which Name points.
    console.log(res)
    console.log(`John https://gateway.ipfs.io/ipns/${res.name}`)

    return res
  })
console.log("res",res)
  let pathCidJohn = await ipfs.name.resolve("John", {
        stream: false,
      })

  console.log("pathCidJohn", pathCidJohn)

  let johnContent = await ipfs.cat(pathCidJohn)
  console.log("johnContent", johnContent)



  // console.log(ipfs.dag)
  // let tree = await ipfs.dag.tree(cborJohnCid)
  // console.log("tree", tree)
  // ipfs.dag.tree(cborJohnCid, { recursive: true }, (err, paths) => {
  //     if (err) {
  //       throw err
  //     }
  //
  //     console.log(paths)
  //   })




}

async function createKey(keyName) {
  return new Promise(async (resolve, reject) => {
    try {
      // generate a key on the browser IPNS keychain with the specified name
      await ipfs.key.gen(keyName, {
        type: 'ed25519'
      })

      // now this key can be used to publish to this ipns publicKey
      resolve(true);
    } catch (err) {
      console.log(`Error creating Key ${keyName}: \n ${err}`);
      reject(false);
    }
  });
}

main()
