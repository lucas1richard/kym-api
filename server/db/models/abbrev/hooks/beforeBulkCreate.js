const { USER } = include('db/foreignKeys');
/* eslint-disable no-param-reassign */

function beforeBulkCreate(abbrevs) {
  abbrevs.forEach((abbrev) => {
    if (abbrev.GmWt_Desc1 && abbrev.GmWt_Desc1.charAt(0) === '.') {
      abbrev.GmWt_Desc1 = `0${abbrev.GmWt_Desc1}`;
    }
    if (abbrev.GmWt_Desc2 && abbrev.GmWt_Desc2.charAt(0) === '.') {
      abbrev.GmWt_Desc2 = `0${abbrev.GmWt_Desc2}`;
    }
    if (abbrev.UserID) {
      abbrev[USER] = abbrev.UserID;
    }
    if (abbrev[USER] === '0') {
      abbrev[USER] = null;
    }
  });
}

module.exports = beforeBulkCreate;
