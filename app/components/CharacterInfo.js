import React from 'react';
import Reflux from 'reflux';
import utils from '../utils/utils';

import { Grid, Thumbnail, Col, Row, ProgressBar, Table, PageHeader } from 'react-bootstrap';

// stores and Actions
import CharactersStore from '../stores/CharactersStore';
import Actions from '../actions/Actions';

import BlockInfo from './BlockInfo';


var CharacterInfo = React.createClass({
  mixins: [
    Reflux.listenTo(CharactersStore, "onCharactersStoreUpdate")
  ],

  getInitialState() {
    return {
      characterInfo: CharactersStore.getDefaultCharacterInfoData()
    };
  },

  onCharactersStoreUpdate(data) {
    this.setState({characterInfo: data});
  },

  componentWillMount() {
    var params = utils.parseURLParams(window.location.href);
    Actions.getCharacterInfo(params.id);
  },

  render() {
    var characterInfo = this.state.characterInfo;

    if(!utils.isEmpty(characterInfo)){
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Thumbnail className='characterInfo' src={characterInfo.thumbnail.path + '.' + characterInfo.thumbnail.extension} />
            </Col>
            <Col xs={12} md={8}>
              <PageHeader>
                {characterInfo.name}
                <small><p>{characterInfo.description}</p></small>
              </PageHeader>

              <BlockInfo items={characterInfo.comics.items} name='Comics' />
              <BlockInfo items={characterInfo.stories.items} name='Stories' />
              <BlockInfo items={characterInfo.series.items} name='Series' />
            </Col>
          </Row>
        </Grid>
      );
    }
    else{
      return (<ProgressBar active now={100} label="Loading ... "/>)
    }
  }
});

export default CharacterInfo;
