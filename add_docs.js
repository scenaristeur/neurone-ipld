
import { create, globSource } from 'ipfs-http-client'

const ipfs = await create()

for await (const file of ipfs.addAll(globSource('./docs', '**/*'))) {
  console.log(file)
}
