import Reflux from 'reflux';

const Actions = Reflux.createActions({
  'getCharacters' : { asyncResult: true },
  'getCharacterInfo' : { asyncResult: true },
});

export default Actions;
