const Abbrev = require('../../abbrev');

const defaultScope = {
  include: [
    Abbrev,
  ]
};
const scopes = {
  micro: {
    include: [
      Abbrev.scope('micro', 'weight')
    ]
  },
  description: {
    include: [
      Abbrev.scope('all')
    ]
  },
};

module.exports = {
  defaultScope,
  scopes
};
