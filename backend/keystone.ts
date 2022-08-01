import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Products';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long the session will last
  secret: process.env.COOKIE_SECRET, // random string used to sign the session
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add an initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to MongoDB!!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
      // TODO: add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // show the admin UI only for people who pass this test
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: 'id',
    }),
  })
);
