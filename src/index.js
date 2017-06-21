const config = require('../config.json');

const blizzard = require('blizzard.js').initialize(
  {
    apikey: config.apiKey
  }
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const FACTION_LIST = {
  ALLIANCE: 'Alliance',
  HORDE: 'Horde',
  NEUTRAL: 'Neutral',
  UNKNOWN: 'Error',
};

const RACE_LIST = {
  HUMAN: 'Human',
  DWARF: 'Dwarf',
  NIGHT_ELF: 'Night Elf',
  GNOME: 'Gnome',
  DRAENAI: 'Draenai',
  WORGEN: 'Worgen',
  ORC: 'Orc',
  UNDEAD: 'Undead',
  TAUREN: 'Taruen',
  TROLL: 'Troll',
  GOBLIN: 'Goblin',
  BLOOD_ELF: 'Blood Elf',
  PANDAREN: 'Pandaren',
  UNKNOWN: 'Error',
};

const CLASS_LIST = {
  WARRIOR: 'Warrior',
  PALADIN: 'Paladin',
  HUNTER: 'Hunter',
  ROGUE: 'Rogue',
  PRIEST: 'Priest',
  DEATH_KNIGHT: 'Death Knight',
  SHAMAN: 'Shaman',
  MAGE: 'Mage',
  WARLOCK: 'Warlock',
  MONK: 'Monk',
  DRUID: 'Druid',
  DEMON_HUNTER: 'Demon Hunter',
  UNKNOWN: 'Error',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleQuery = this.handleQuery.bind(this);
    
    this.state = {
      data: null,
    };
  }
  
  handleQuery(data) {
    this.setState(
      {
        data: data,
      }
    );
  }
  
  render() {
    return (
      <div>
        <Form onQuery={this.handleQuery}/>
        <Data data={this.state.data}/>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const form = ReactDOM.findDOMNode(this);
    const data = new FormData(form);
    
    console.log(data.get('name'));
    console.log(data.get('realm'));
    
    blizzard.wow.character(
      ['profile'],
      {
        origin: 'us',
        realm: data.get('realm'),
        name: data.get('name'),
      }
    ).then(response => {
      this.props.onQuery(response.data);
    });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Character Name"/>
        <input type="text" name="realm" placeholder="Realm"/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class Data extends React.Component {
  constructor(props) {
    super(props);
  }
  
  factionNumberToFactionName(number) {
    switch (number) {
      case 0:
        return FACTION_LIST.ALLIANCE;
      case 1:
        return FACTION_LIST.HORDE;
      case 2:
        return FACTION_LIST.NEUTRAL;
      default:
        return FACTION_LIST.UNKNOWN;
    }
  }
  
  raceNumberToRaceName(number) {
    switch (number) {
      case 1:
        return RACE_LIST.HUMAN;
      case 2:
        return RACE_LIST.ORC;
      case 3:
        return RACE_LIST.DWARF;
      case 4:
        return RACE_LIST.NIGHT_ELF;
      case 5:
        return RACE_LIST.UNDEAD;
      case 6:
        return RACE_LIST.TAUREN;
      case 7:
        return RACE_LIST.GNOME;
      case 8:
        return RACE_LIST.TROLL;
      case 9:
        return RACE_LIST.GOBLIN;
      case 10:
        return RACE_LIST.BLOOD_ELF;
      case 11:
        return RACE_LIST.DRAENAI;
      case 22:
        return RACE_LIST.WORGEN;
      case 24:
      case 25:
      case 26:
        return RACE_LIST.PANDAREN;
      default:
        return RACE_LIST.UNKNOWN;
    }
  }
  
  classNumberToClassName(number) {
    switch (number) {
      case 1:
        return CLASS_LIST.WARRIOR;
      case 2:
        return CLASS_LIST.PALADIN;
      case 3:
        return CLASS_LIST.HUNTER;
      case 4:
        return CLASS_LIST.ROGUE;
      case 5:
        return CLASS_LIST.PRIEST;
      case 6:
        return CLASS_LIST.DEATH_KNIGHT;
      case 7:
        return CLASS_LIST.SHAMAN;
      case 8:
        return CLASS_LIST.MAGE;
      case 9:
        return CLASS_LIST.WARLOCK;
      case 10:
        return CLASS_LIST.MONK;
      case 11:
        return CLASS_LIST.DRUID;
      case 12:
        return CLASS_LIST.DEMON_HUNTER;
      default:
        return CLASS_LIST.UNKNOWN;
    }
  }
  
  render() {
    if (this.props.data === null) {
      return <div>Enter a name, and a realm to get started.</div>;
    }
    
    const faction = this.factionNumberToFactionName(this.props.data.faction);
    const race = this.raceNumberToRaceName(this.props.data.race);
    const className = this.classNumberToClassName(this.props.data.class);
    
    return <div>
      Server: { this.props.data.realm }
      <br/>
      Name: { this.props.data.name }, Level { this.props.data.level } { faction } { race } { className }
      <br/>
      Achievement Points: { this.props.data.achievementPoints }
    </div>;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
