const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://pepese.com/user.schema.json',
  title: 'user',
  description: 'A product in the catalog',
  type: 'object',
  properties: {
    id: {
      description: 'The unique identifier for a user.',
      type: 'string',
    },
    name: {
      description: 'User name.',
      type: 'string',
    },
  },
  required: ['id', 'name'],
};

module.exports = schema;
