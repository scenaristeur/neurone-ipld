import { create } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001
const ipfs = create()

import { encode, decode } from '@ipld/dag-cbor'
// import { CID } from 'multiformats'
import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { sha256 } from 'multiformats/hashes/sha2'

const bytes = json.encode({ hello: 'world' })

const hash = await sha256.digest(bytes)
const cidJson = CID.create(1, json.code, hash)
console.log("cidJson",cidJson)


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




// await ipfs.files.write('/neurone/test/object.json', obj, { create: true })


let data = encode(obj)
let decoded = decode(data)
decoded.y[0] // 2
let cidObj = await CID.asCID(decoded.z.a) // cid instance
console.log("cidObj", cidObj)

// const streamObj = await ipfs.cat(cidObj)
// let dataObj = ''
//
// for await (const chunk of streamObj) {
//   // chunks of data are returned as a Buffer, convert it back to a string
//   dataObj += chunk.toString()
// }
//
// console.log("data obj",dataObj)


const greeting = `Hello, <YOUR NAME HERE>, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec semper mi, non tincidunt leo. Integer pulvinar erat nec iaculis semper. Curabitur tempus massa id mi feugiat, nec commodo metus suscipit. Sed scelerisque mollis sem, vel placerat nunc dictum quis. Donec nec velit faucibus, malesuada purus vitae, molestie nunc. Aliquam lacinia viverra leo, ac sagittis turpis sollicitudin vitae. Morbi lobortis lectus urna, sed semper lectus cursus at. Integer porttitor, nunc et molestie congue, nisl dui aliquet risus, eu vehicula purus tellus nec lacus. Nullam fringilla lorem risus, et pretium purus facilisis a. Aenean ac quam nisl. Cras convallis sollicitudin facilisis. Aenean odio quam, efficitur nec lorem sed, iaculis sodales arcu. Aliquam ac mi convallis, sagittis quam a, maximus dolor. Cras vitae magna nulla. Phasellus blandit malesuada nisl bibendum euismod. Donec venenatis velit et tellus vehicula ultrices. Pellentesque a felis quis augue venenatis tristique eu in ex. Suspendisse sollicitudin ex id mi suscipit dictum. Donec vitae tortor id dui pretium porttitor ut at mauris. Sed semper dolor et eros dictum finibus. Maecenas augue libero, pretium id nisi ornare, viverra consectetur velit. Suspendisse suscipit ante nec enim finibus, tempus scelerisque risus ornare. Sed volutpat sem et felis pretium, non condimentum est imperdiet. Nulla sit amet metus quis ante convallis sagittis sed quis orci. Suspendisse vel massa malesuada, ultrices metus quis, semper diam. Aliquam tempor arcu est, ac efficitur augue mattis non. Nam quis pharetra metus, a imperdiet justo. Integer lacus dui, pretium a hendrerit eu, imperdiet quis risus. Maecenas euismod lobortis velit, ut interdum nunc aliquam sed. In hac habitasse platea dictumst. Fusce vestibulum velit vel viverra suscipit. Nullam consequat felis leo, et tempus augue dapibus non. Quisque feugiat, quam ac convallis scelerisque, massa libero consequat dui, in maximus ex nunc nec mi. Aenean rutrum vulputate mi, in scelerisque orci. Aenean commodo sem eget orci feugiat rhoncus.

Cras tempor quam vitae metus dignissim imperdiet. Donec suscipit condimentum nibh et dictum. Sed eget pretium nulla. Sed id malesuada lectus. Nullam nisi diam, venenatis id quam in, accumsan ultricies dui. Nam bibendum fringilla viverra. Proin rhoncus lectus convallis tempus dapibus. Donec semper a orci vel dapibus. Donec a placerat urna, sit amet gravida ipsum. Quisque faucibus ornare risus, in congue nunc malesuada vel.

Donec facilisis at urna id maximus. Suspendisse ut ante ullamcorper, congue metus vel, condimentum tortor. Suspendisse potenti. Fusce finibus metus eu tellus faucibus congue. Sed tempor ipsum ut massa commodo, vel condimentum eros cursus. Quisque faucibus massa condimentum, iaculis ligula sit amet, pulvinar arcu. Duis sed massa sit amet urna dictum porta nec sit amet dui. Nunc condimentum id ante ac ultricies. Suspendisse fermentum tellus a ex aliquam pharetra. Curabitur porta purus sit amet enim pellentesque, at vestibulum quam efficitur.`

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
const results = await ipfs.add(greeting)
console.log("greetings",results)
// we loop over the results because 'add' supports multiple
// additions, but we only added one entry here so we only see
// one log line in the output
// for await (const { cid } of results) {
//   // CID (Content IDentifier) uniquely addresses the data
//   // and can be used to get it again.
//   console.log("hello cid", cid.toString())
// }


const stream = ipfs.cat(results.cid)
let some_data = ''

for await (const chunk of stream) {
  // chunks of data are returned as a Buffer, convert it back to a string
  some_data += chunk.toString()
}

console.log("some_data", some_data)

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
