import { create, CID } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001
const ipfs = create()

// // connect to a different API
// const client = create('http://127.0.0.1:5002')
//
// // connect using a URL
// const client = create(new URL('http://127.0.0.1:5002'))

// call Core API methods
const { cid } = await ipfs.add('Hello world!')

console.log("cid", cid)


function errOrLog(err, result) {
    if (err) {
      console.error('error: ' + err)
    } else {
      console.log(result)
    }
}

async function createAndFeatchNodes(){
    let vasa = await ipfs.dag.put({name: 'vasa'});

    //Linking secondNode to vasa using named link.
    let secondNode = await ipfs.dag.put({
        publication: {
            authors: {
                authorName: vasa
            }
        }
    });

    //featching multihash buffer from cid object.
    const multihash = secondNode.multihash;

    //passing multihash buffer to CID object to convert multihash to a readable format
    const cids = new CID(1, 'dag-cbor', multihash);

    //Featching the value using links
    ipfs.dag.get(cids.toBaseEncodedString()+'/publication/authors/authorName/name', errOrLog);
    /* prints { value: 'vasa', remainderPath: '' } */
}
createAndFeatchNodes();
