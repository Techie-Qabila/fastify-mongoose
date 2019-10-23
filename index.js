'use strict'

const fp = require('fastify-plugin')
const mongoose = require('mongoose')
const Bluebird = require('bluebird')
const ObjectId = mongoose.Types.ObjectId

mongoose.Promise = Bluebird

function fastifyMongoose (fastify, options, next) {
  const uri = options.uri
  delete options.uri
  const opt = Object.assign({}, options, {
    promiseLibrary: Bluebird,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  mongoose.connect(uri, opt)
    .then(
      () => {

        mongoose.connection.on('error', err => {
          console.log('Mongoose connection error', err)
        });

        const mongo = {
          db: mongoose.connection,
          ObjectId: ObjectId
        }

        fastify
          .decorate('mongo', mongo)
          .addHook('onClose', function (fastify, done) {
            fastify.mongo.db.close(done)
          })

        next()
      })
    .catch(
      err => {
          console.log('Error connecting to MongoDB', err)
          next(err)
        }
    )
}

module.exports = fp(fastifyMongoose, '>=0.29.0')