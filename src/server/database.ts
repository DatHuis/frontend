/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 */

import MOCK_DATA from './MOCK_DATA.json';

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  tag: Array<string>;
  created: string;
  lastContact: string;
  age: number;
};

const contacts: Array<Contact> = MOCK_DATA.map((item: any) => {
  const { lang1, lang2, lang3, lang4, ...rest } = item;

  const tag = [];
  if (lang1) tag.push(lang1);
  if (lang2) tag.push(lang2);
  if (lang3) tag.push(lang3);
  if (lang4) tag.push(lang4);

  return {
    ...rest,
    tag,
  };
});

export default {
  contacts,
};
