import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.localStorage = {
  getItem: () => 'item',
  setItem: () => null
};

configure({
  adapter: new Adapter()
});
