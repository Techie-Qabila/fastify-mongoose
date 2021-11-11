# fastify-mongoose

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Under the hood [mongoose](http://mongoosejs.com/index.html) ODM is used, the options that you pass to `register` will be passed to the Mongoose connection. Pass the uri option is *required*.

## Install
```
npm i fastify-mongoose --save
```
## Usage
Add it to you project with `register` and you are done!
You can access the *Mongoose Connection* via `fastify.mongo.db` and *ObjectId* via `fastify.mongo.ObjectId`.
```js
const fastify = require('fastify')

fastify.register(require('fastify-mongoose'), {
  uri: 'mongodb://localhost/test_db'
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

**With Typescript**

```typescript
import fastify from 'fastify'
import fastifyMongoose, { FastifyMongooseOptions } from 'fastify-mongoose'

const options: FastifyMongooseOptions = {
  uri: 'mongodb://localhost/test_db',
  name: 'mongo' // Optional, the name to decorate fastify
}

fastify.register(fastifyMongoose, )

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

declare module 'fastify' {
  import { Connection, ObjectId } from 'mongoose';

  interface FastifyInstance {
    mongo: { // needs to be the same name in options
      db: Connection;
      ObjectId: ObjectId;
    }
  }
}
```

##### Breaking changes
`"version": "0.3.0` and above plugin have ability to open connection with multiple different databases, for achieving this functionality it have to stop using default mongoose connection. Onward please use db client returned by this plugin.

## License

Licensed under [MIT](./LICENSE).
