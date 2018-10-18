const { expect } = require('chai');
const beforeBulkCreate = require('../beforeBulkCreate');

/* eslint-disable no-param-reassign */

describe('abbrev beforeBulkCreate', () => {
  it('cleans up abbrevs', () => {
    const abbrevs = [{
      GmWt_Desc1: '.5',
      GmWt_Desc2: '.5',
      UserID: 1
    }];
    beforeBulkCreate(abbrevs);
    expect(abbrevs[0]).to.eql({
      GmWt_Desc1: '0.5',
      GmWt_Desc2: '0.5',
      UserID: 1,
      user_id: 1
    });
  });

  it('cleans up abbrevs with UserID === \'0\'', () => {
    const abbrevs = [{
      GmWt_Desc1: '.5',
      GmWt_Desc2: '.5',
      UserID: '0'
    }];
    beforeBulkCreate(abbrevs);
    expect(abbrevs[0]).to.eql({
      GmWt_Desc1: '0.5',
      GmWt_Desc2: '0.5',
      UserID: '0',
      user_id: null
    });
  });
});
