import { create } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001
const ipfs = create()

import { encode, decode } from '@ipld/dag-cbor'
import { CID } from 'multiformats'

// // connect to a different API
// const client = create('http://127.0.0.1:5002')
//
// // connect using a URL
// const client = create(new URL('http://127.0.0.1:5002'))

// call Core API methods
 // const { cid } = await ipfs.add('Hello world!')
//await ipfs.files.mkdir('/neurone')

// remove a directory and its contents
// await ipfs.files.rm('/my/beautiful/directory', { recursive: true })

await ipfs.files.mkdir('/neurone/test/sub/folder', { parents: true })

await ipfs.files.write('/neurone/test/example.txt', "blabla bloom", { create: true })
await ipfs.files.write('/neurone/test/example.json', "{'one': 'two'}", { create: true })
await ipfs.files.write('/neurone/test/sub/example.html', "<h1>Hello Neurone-IPLD</h1>", { create: true })

let stat = await ipfs.files.stat('/neurone')
console.log("stat", stat)
let cid = stat.cid
console.log("cid new", cid)


// The address of your files.
const addr = '/ipfs/'+cid

await ipfs.name.publish(addr).then(function (res) {
  // You now receive a res which contains two fields:
  //   - name: the name under which the content was published.
  //   - value: the "real" address to which Name points.
  console.log(res)
  console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
})

let content = await ipfs.files.read('/neurone/test/example.json'/*, [options]*/)

console.log("content", content)




const obj = {
  x: 1,
  /* CID instances are encoded as links */
  y: [2, 3, CID.parse('QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4')],
  z: {
    a: CID.parse('QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4'),
    b: null,
    c: 'string'
  }
}


 const { cidObj } = await ipfs.add(obj)
 console.log("cidObj", cidObj)

await ipfs.files.write('/neurone/test/object.json', obj, { create: true })


let data = encode(obj)
let decoded = decode(data)
decoded.y[0] // 2
let resp = await CID.asCID(decoded.z.a) // cid instance
console.log("resp", resp)

// async function createAndFeatchNodes(){
//     let vasa = await ipfs.dag.put({name: 'vasa'});
//
//     //Linking secondNode to vasa using named link.
//     let secondNode = await ipfs.dag.put({
//         publication: {
//             authors: {
//                 authorName: vasa
//             }
//         }
//     });
//
//     //featching multihash buffer from cid object.
//     const multihash = secondNode.multihash;
//
//     //passing multihash buffer to CID object to convert multihash to a readable format
//     const cids = new CID(1, 'dag-cbor', multihash);
//
//     //Featching the value using links
//     ipfs.dag.get(cids.toBaseEncodedString()+'/publication/authors/authorName/name', errOrLog);
//     /* prints { value: 'vasa', remainderPath: '' } */
// }
// createAndFeatchNodes();



console.log("done")
