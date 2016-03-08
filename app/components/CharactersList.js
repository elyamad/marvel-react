import React from 'react';
import Reflux from 'reflux';

import { Grid, Thumbnail, Col, Row, ProgressBar, Button, Label } from 'react-bootstrap';

// stores and Actions
import CharactersStore from '../stores/CharactersStore';
import Actions from '../actions/Actions';


var CharactersList = React.createClass({
  mixins: [
    Reflux.listenTo(CharactersStore, "onCharactersStoreUpdate")
  ],

  getInitialState() {
    return {
      characters: CharactersStore.getDefaultCharactersData()
    };
  },

  onCharactersStoreUpdate(data) {
    this.setState({characters: data.results});
  },

  componentWillMount() {
    Actions.getCharacters();
  },

  render() {
    var characters = this.state.characters;
    if(characters && characters.length) {
      var _charactersItems = [];

      characters.forEach(function (character, i) {
        var _characterUrls = [];
        character.urls.forEach(function(url, i){
          _characterUrls.push(<a href={'/#/character?id='+character.id} key={i}><Label bsStyle="default">{url.type}</Label>&nbsp;</a>);
        });

        _charactersItems.push(
          <Col key={i} xs={6} md={4}>
            <Thumbnail className='charactersList' src={character.thumbnail.path + '.' + character.thumbnail.extension}>
              <h3>{character.name}</h3>
              <p>
                {_characterUrls}
              </p>
            </Thumbnail>
          </Col>
        );
      });

      return (
        <Grid>
          <Row>
            {_charactersItems}
          </Row>
        </Grid>
        );
    }else{
      return (<ProgressBar active now={100} label="Loading ... "/>)
    }
  }
});

export default CharactersList;
