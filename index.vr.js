import React, { Component } from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, asset, StyleSheet, VrButton } from 'react-vr';
import Timer from './Timer';
import levels from './levels.json';
import Button from './Button.js';

const game = {
    counter:5,
    countdown(){
            game.counter--
            console.log(game.counter)
            if(game.counter == 0){
                console.log('Game Over')
                // reset
                game.counter = 5
            }
        },
        startGame(){
            // this is an intial timer for the game
            timer = setInterval(game.countdown,1000)
        }
}

class WorldTour extends Component{
constructor(){
  super();

  this.state={
    deviceConnected: false,
    showMenu: false,
    levels,
    elapsed: 0
  }

}


toggleMenu(){
  this.setState({showMenu: !this.state.showMenu})
}

renderTimer(){
  return(
      <Timer start={Date.now()} />
  );
}

handleClick(){
 renderTimer();
}

  render(){
    const renderTimer=this.renderTimer();
     return (

      <View>
        <Pano source= {asset(this.state.levels[0].image)}></Pano>
        { renderTimer }

      <Button audio={this.state.levels[0].audio}
          startTimer={this.handleClick}/>
        <View style={styles.menuButton}
          onEnter={() => this.toggleMenu()}
          >

          <Text style={styles.menuButtonText}>
            {this.state.showMenu ? 'Close Menu' : 'Open Menu'}

          </Text>
        </View>


          <View style={styles.menu}>


                <View
                  style={styles.menuItem}

                  >
                  <Text style={styles.menuItemText}>{}</Text>
                </View>

          </View>

      </View>
    )
  }
};

const styles = StyleSheet.create({
menu:{
  width: 5,
  height: 1.25,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  transform: [
    {translate: [-2, 0, -7.5]}
  ]
},
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 0.25,
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    transform: [
      {translate: [-2, 0, -5]}
    ]

  },
  menuButtonText: {
    textAlign: 'center',
    fontSize: 0.15,
    color: '#000'
  },
  timer:{
    textAlign: 'center',
    fontSize: 0.15,
    color: '#fff',
    transform: [
      {translate: [2, 0, -1]}
    ]
  },
  menuItem:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 1,
    height: 1,
    borderRadius: 0.5,
    borderWidth: 0.02,
    backgroundColor: '#fff'
  },
  menuItemText: {
    fontSize: 0.2,
    textAlign: 'center',
    color: '#000'
  }
})
AppRegistry.registerComponent('WorldTour', () => WorldTour);
