'use strict'

const fp = require('fastify-plugin')
const Mongoose = require('mongoose')

const ObjectId = Mongoose.Types.ObjectId

function fastifyMongoose (fastify, options, next) {
  const uri = options.uri
  delete options.uri

  Mongoose.connect(uri, options)
    .then(() => {
      const mongo = {
        db: Mongoose.connection,
        ObjectId: ObjectId
      }

      fastify
        .decorate('mongo', mongo)
        .addHook('onClose', function (fastify, done) {
          fastify.mongo.db.close(done)
        })

      next()
    },
    err => {
      if (err) return next(err)
    })
}

module.exports = fp(fastifyMongoose)
