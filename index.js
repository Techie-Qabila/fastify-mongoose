'use strict'

const fp = require('fastify-plugin')
const Mongoose = require('mongoose')
const Bluebird = require('bluebird')

const ObjectId = Mongoose.Types.ObjectId

function fastifyMongoose (fastify, options, next) {
  const uri = options.uri
  delete options.uri
  const opt = Object.assign({}, options, {
    promiseLibrary: Bluebird
  })

  Mongoose.Promise = Bluebird
  Mongoose.connect(uri, opt)
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

module.exports = fp(fastifyMongoose, '>=0.29.0')
