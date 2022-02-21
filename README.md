# ipld

# prerequis
-- install go-ipfs https://dist.ipfs.io/#go-ipfs
-- install ipfs https://github.com/ipfs/ipfs-desktop/releases

# install
```
npm install
```

# run
```
node .
```

# ipld codecs
- https://github.com/ipfs/js-ipfs/blob/9a40109632e5b4837eb77a2f57dbc77fbf1fe099/docs/IPLD.md
- resolve graph & traverse https://www.youtube.com/watch?v=drULwJ_ZDRQ&t=89s
- @ipld/dag-pb - used for file and directory structures
- raw - used for file data where imported with --raw-leaves=true
- @ipld/dag-cbor - used for storage of JavaScript Objects with CID links to other blocks
- json - used for storage of plain JavaScript Objects

- exemples https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/custom-ipld-formats
- traverse graph https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/traverse-ipld-graphsll



# sources
- ipld codecs https://github.com/ipfs/js-ipfs/blob/9a40109632e5b4837eb77a2f57dbc77fbf1fe099/docs/IPLD.md
- dag https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md
- exemples dag https://github.com/ipfs/js-ipfs/tree/master/packages/interface-ipfs-core/src/dag
- get https://github.com/ipfs/js-ipfs/blob/master/packages/interface-ipfs-core/src/dag/get.js
- https://docs.ipfs.io/concepts/file-systems/#mutable-file-system-mfs
- https://hackernoon.com/understanding-ipfs-in-depth-2-6-what-is-interplanetary-linked-data-ipld-c8c01551517b
- https://www.npmjs.com/package/ipfs-http-client
- ipns https://docs.ipfs.io/concepts/ipns/
