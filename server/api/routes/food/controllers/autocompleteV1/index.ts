import { AbbrevApi } from '@kym/db';

async function autocompleteV1({ foodname }: { foodname: string }) {
  return AbbrevApi.findAutocompleteMain({ foodname });
}

module.exports = autocompleteV1;
