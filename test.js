'use strict'

const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const fastifyMongoose = require('./index')

const uri = 'mongodb://localhost/test_db'

test('fastify.mongo should exist', t => {
  t.plan(5)

  const fastify = Fastify()

  fastify.register(fastifyMongoose, {
    uri: uri
  }, err => {
    t.error(err)
  })

  fastify.ready(err => {
    t.error(err)
    t.ok(fastify.mongo)
    t.ok(fastify.mongo.db)
    t.ok(fastify.mongo.ObjectId)

    fastify.close()
  })
})
