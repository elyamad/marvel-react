import React from 'react';
import Reflux from 'reflux';

import { Grid, Thumbnail, Col, Row, ProgressBar, Table, PageHeader } from 'react-bootstrap';

// stores and Actions
import CharactersStore from '../stores/CharactersStore';
import Actions from '../actions/Actions';


var BlockInfo = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    items: React.PropTypes.array
  },

  render() {
      var _renderItems = [], _renderItem = [];

      if(this.props.items.length){
        this.props.items.forEach(function(item, i){
          _renderItem.push(<tr key={i}><td>{item.name}</td></tr>);
        });
        _renderItems = (
          <Table responsive>
            <thead>
              <tr>
                <th>{this.props.name}</th>
              </tr>
            </thead>
                <tbody>
                  {_renderItem}
                </tbody>
            </Table>
        )
      }

      return (<div> {_renderItems} </div>);
    }
});

export default BlockInfo;
