
import { create, urlSource } from 'ipfs-http-client'
const ipfs = create()

const file = await ipfs.add(urlSource('https://docs.ipfs.io/images/ipfs-logo.svg'))
console.log(file)
