import React from 'react';
import {List, Map as ImmutableMap} from 'immutable';
import {VotingContainer} from './Voting';
import {ResultsContainer} from './Results';
import {Route, Switch} from 'react-router-dom';

const pair = List.of('Trainspotting', '28 Days Later', '127 hours');
const tally = ImmutableMap({'Trainspotting': 5, '28 Days Later': 4});

export default class App extends React.Component {
  render() {
    return <Switch>
    	<Route path="/voting" component={VotingContainer} />
    	<Route path="/results" component={ResultsContainer} />
    </Switch>
  }
}