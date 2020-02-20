/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 */

import schema from './schema';
import { ApolloServer, gql } from 'apollo-server';
import Database, { Contact } from './database';

const typeDefs = gql`
  ${schema}
`;

const resolvers = {
  Query: {
    search: (_: any, args: any) => {
      const res = args.filter.reduce(
        (prev: any, filter: any) => {
          console.log(filter);
          const result: Array<Contact> = [];
          const { String, Number, Date } = filter;

          prev.forEach((entry: Contact) => {
            const shouldBeAdded = NumberFilter(Number, entry) && StringFilter(String, entry) && DateFilter(Date, entry);

            if (shouldBeAdded) result.push(entry);
          });

          return result;
        },
        [...Database.contacts],
      );

      return res;
    },
  },
};

const NumberFilter = (filter: any, item: any): boolean => {
  if (!filter) return true;

  let fits = true;
  if (filter.gt != null) fits = fits && item[filter.field] > filter.gt;
  if (filter.lt != null) fits = fits && item[filter.field] < filter.lt;
  if (filter.eq != null) fits = fits && item[filter.field] === filter.eq;

  return fits;
};

const DateFilter = (filter: any, item: any): boolean => {
  if (!filter) return true;

  let fits = true;
  if (filter.gt != null) fits = fits && new Date(item[filter.field]).getTime() > new Date(filter.gt).getTime();
  if (filter.lt != null) fits = fits && new Date(item[filter.field]).getTime() < new Date(filter.lt).getTime();
  if (filter.eq != null) fits = fits && new Date(item[filter.field]).getTime() === new Date(filter.eq).getTime();

  return fits;
};

const StringFilter = (filter: any, item: any): boolean => {
  if (!filter) return true;

  let fits = true;
  if (filter.eq != null) fits = fits && item[filter.field] === filter.eq;
  if (filter.beginsWith != null) fits = fits && item[filter.field].beginsWith(filter.beginsWith);
  if (filter.endsWith != null) fits = fits && item[filter.field].endsWith(filter.endsWith);
  if (filter.contains != null) fits = fits && item[filter.field].indexOf(filter.contains) !== -1;

  return fits;
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
