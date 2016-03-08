import Reflux from 'reflux';
import Actions from '../actions/Actions';
import utils from '../utils/utils';

var apiRequest = require ('../utils/apiRequest');
var constants = require ('../utils/constants');

let _defaultCharacters = [], _defaultCharacterInfo = {};

var UsersStore = Reflux.createStore({

  listenables: Actions,

  init: function(){
    this._characters = [];
    this._characterInfo = {};
  },

  getCharacters: function() {
    apiRequest
    .get(this.getCharactersResource())
    .end(function (err, response) {
      if (response && response.ok) {
        Actions.getCharacters.completed(response.body.data);
      } else {
        Actions.getCharacters.failed(err);
      }
    });
  },

  onGetCharactersCompleted: function (characters){
    this._characters = characters;
    this.trigger(this._characters);
  },

  onGetCharactersFailed: function (err){
    this._characters = _defaultCharacters;
    this.trigger(this._characters);
  },

  getCharacterInfo: function(characterId) {
    apiRequest
    .get(this.getCharacterInfoResource(characterId))
    .end(function (err, response) {
      if (response && response.ok) {
        Actions.getCharacterInfo.completed(response.body.data);
      } else {
        Actions.getCharacterInfo.failed(err);
      }
    });
  },

  onGetCharacterInfoCompleted: function (characterInfo){
    this._characterInfo = characterInfo.results[0];
    this.trigger(this._characterInfo);
  },

  onGetCharacterInfoFailed: function (err){
    this._characterInfo = _defaultCharacterInfo;
    this.trigger(this._characterInfo);
  },

  getDefaultCharactersData() {
   return _defaultCharacters;
  },

  getDefaultCharacterInfoData(){
    return _defaultCharacterInfo;
  },

  getCharactersResource(){
    var ts = utils.getTimestamp();
    var apikey = constants.client.apikey;
    var apikeyPrivate = constants.client.apikeyPrivate;
    var baseUrl = constants.client.baseUrl;
    var hash = utils.md5(ts + apikeyPrivate + apikey);
    var uri = constants.client.uri;

    return baseUrl + uri + '?ts=' + ts + '&apikey=' + apikey + '&hash=' + hash;
  },

  getCharacterInfoResource(characterId){
    var ts = utils.getTimestamp();
    var apikey = constants.client.apikey;
    var apikeyPrivate = constants.client.apikeyPrivate;
    var baseUrl = constants.client.baseUrl;
    var hash = utils.md5(ts + apikeyPrivate + apikey);
    var uri = constants.client.uri;

    return baseUrl + uri + '/' + characterId + '?ts=' + ts + '&apikey=' + apikey + '&hash=' + hash;
  }
});

export default UsersStore;
