import { FastifyPlugin } from 'fastify';
import { ConnectOptions } from 'mongoose';

export interface FastifyMongooseOptions extends ConnectOptions {
  /**
   * Connection string to your MongoDB instance
   */
  uri: string;
  /**
   * Name of the plugin, default: mongo
   */
  name?: string;
}

export const fastifyMongoose: FastifyPlugin<FastifyMongooseOptions>;
export default fastifyMongoose;
