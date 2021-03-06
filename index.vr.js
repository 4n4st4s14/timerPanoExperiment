import React, { Component } from 'react';
import GazeButton from 'react-vr-gaze-button';
import { View, Text, Pano, AppRegistry, asset, StyleSheet, VrButton, Animated } from 'react-vr';
import Timer from './Timer';
import levels from './levels.json';
import Button from './Button.js';
import Countdown from './Countdown.js';


class WorldTour extends Component{
constructor(){
  super();

  this.state={
    deviceConnected: false,
    showMenu: false,
    levels,
    elapsed: 0,
    timer: 5,
    imageVar: 0,
    intervalId: '',
    status: '',
    fadeAnim: new Animated.Value(1)
  }
  this.startTimer = this.startTimer.bind(this);
}

componentDidUpdate(){

switch (this.state.status) {
      case 'started':
        this.timer;
        break;
      case 'stopped':
      clearInterval(this.timer);
        break;
}
}

startTimer(){
  let x = this.state.timer
  if(x === 0){
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 0}
    ).start();

    //don't mutate state, use setState
    this.state.elapsed +=1;
    // this.setState({intervalId: ''});
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 1}
    ).start();
   return this.setState({status: 'stopped', imageVar: this.state.elapsed});


  } else{
    x -= 1
    this.setState({timer: x})
  }
    }

startGame(){
    // this is an intial timer for the game
this.timer = setInterval(this.startTimer,1000);
this.setState({status: 'started'})

  // var intervalId = setInterval(this.startTimer, 1000);
  //  // store intervalId in the state so it can be accessed later:
  // this.setState({intervalId: intervalId});
}

toggleMenu(){
  this.setState({showMenu: !this.state.showMenu})
}

  render(){
     return (
      <Animated.View style={{opacity: this.state.fadeAnim}}>
        <Pano source= {asset(this.state.levels[this.state.imageVar].image)}></Pano>
        <Timer {...this.state} />
      <Button startGame={this.startGame.bind(this)} {...this.state} audio={this.state.levels[0].audio}

         />
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

      </Animated.View>
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
