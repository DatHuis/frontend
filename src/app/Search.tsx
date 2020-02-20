/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 */

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { Contact as Contact_Type } from '../server/database';

const SEARCH = gql`
  query Search($filter: [SearchType__Input!]!) {
    search(filter: $filter) {
      id
      first_name
      last_name
      email
      gender
      tag
      created
      lastContact
      age
    }
  }
`;

const Search = () => {
  const { loading, error, data } = useQuery(SEARCH, {
    variables: {
      filter: [
        { Number: { field: 'age', gt: 90, lt: 95 } },
        { String: { field: 'first_name', contains: 'K' } },
        { Date: { field: 'lastContact', lt: '2020-02-01T00:00:00Z', gt: '2020-01-01' } },
      ],
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.toString()}</p>;

  return (
    <ContactContainer>
      {data.search.map(({ id, first_name, last_name, email, gender, tag, created, lastContact, age }: Contact_Type) => (
        <Contact key={id}>
          {first_name}, {last_name}, {email}, {gender}, {tag.join(' ')}, {created}, {lastContact}, {age}
        </Contact>
      ))}
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contact = styled.div`
  margin: 10px;
  padding: 10px;
  box-shadow: 0px 0px 5px 0px grey;
`;

export default Search;
