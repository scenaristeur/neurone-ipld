import { create, CID } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001
const client = create()

// // connect to a different API
// const client = create('http://127.0.0.1:5002')
//
// // connect using a URL
// const client = create(new URL('http://127.0.0.1:5002'))

// call Core API methods
const { cid } = await client.add('Hello world!')

console.log("cid", cid)
