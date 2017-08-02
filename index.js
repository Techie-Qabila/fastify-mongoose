'use strict'

const fp = require('fastify-plugin')
const Mongoose = require('mongoose')
const Bluebird = require('bluebird')

const ObjectId = Mongoose.Types.ObjectId

function fastifyMongoose (fastify, options, next) {
  const uri = options.uri
  delete options.uri
  const opt = Object.assign({}, options, {
    promiseLibrary: Bluebird,
    useMongoClient: true
  })

  Mongoose.connect(uri, opt, onConnect)

  function onConnect (err) {
    if (err) return next(err)

    const mongo = {
      db: Mongoose.connection,
      ObjectId: ObjectId
    }

    fastify
            .decorate('mongo', mongo)
            .addHook('onClose', close)

    next()
  }
}

function close (fastify, done) {
  fastify.mongo.db.close(done)
}

module.exports = fp(fastifyMongoose, '>=0.25.3')
