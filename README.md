# fastify-mongodb

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
}, err => {
  if (err) throw err
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

## License

Licensed under [MIT](./LICENSE).