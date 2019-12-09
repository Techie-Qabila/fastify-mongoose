'use strict'

const fp = require('fastify-plugin')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

function fastifyMongoose (fastify, options, next) {
  const uri = options.uri
  if (!uri) {
    next(new Error('`uri` parameter is mandatory'))
    return
  }
  delete options.uri

  const name = options.name
  if (name) {
    delete options.name
  }

  const opt = {
    useCreateIndex: true,
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose.createConnection(uri, opt)
    .then(db => {
      db.on('error', err => {
        fastify.log.error(err, 'Mongoose connection error')
      })

      fastify.addHook('onClose', function (fastify, done) {
        db.close(done)
      })

      const mongo = {
        db: db,
        ObjectId: ObjectId
      }

      if (name) {
        if (!fastify.mongo) {
          fastify.decorate('mongo', mongo)
        }
        if (fastify.mongo[name]) {
          next(new Error('Connection name already registered: ' + name))
          return
        }

        fastify.mongo[name] = mongo
      } else {
        if (fastify.mongo) {
          next(new Error('fastify-mongoose has already registered'))
          return
        }
      }

      if (!fastify.mongo) {
        fastify.decorate('mongo', mongo)
      }

      next()
    })
    .catch(err => {
      fastify.log.error(err, 'Error connecting to MongoDB')
      next(err)
    })
}

module.exports = fp(fastifyMongoose, {
  fastify: '>=1.0.0',
  name: 'fastify-mongoose'
})
