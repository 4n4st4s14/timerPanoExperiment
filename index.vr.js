import React, { Component } from 'react';
import { View, Text, Pano, AppRegistry, asset, StyleSheet } from 'react-vr';
import Timer from './Timer';


const places = [
{
    title: 'island-garden',
    image: 'island-garden.jpg'
  },
  {
    title: 'starry-sky',
    image: 'starry-sky.jpg'
  },
  {
    title: 'winter-outdoor',
    image: 'winter-outdoor.jpg'
  },
  {
    title: 'museum',
    image: 'museum.jpg'
  }
]

class WorldTour extends Component{
constructor(){
  super();

  this.state={
    showMenu: false,
    place: 'starry-sky.jpg',
    elapsed: 0
  }
}


toggleMenu(){
  this.setState({showMenu: !this.state.showMenu})
}


  render(){
     return (
      <View>
        <Pano source={asset(this.state.place)}></Pano>
        <View style={styles.menuButton}
          onEnter={() => this.toggleMenu()}
          >
          <Timer style={styles.timer} start={Date.now()} />
          <Text style={styles.menuButtonText}>
            {this.state.showMenu ? 'Close Menu' : 'Open Menu'}

          </Text>
        </View>

        {
          this.state.showMenu ?

          <View style={styles.menu}>
            {places.map((place, index) => {
              return(
                <View
                  style={styles.menuItem}
                  key={index}
                  onEnter={() => this.setState({place: place.image})}
                  onClick={() => this.startTimer()}
                  >
                  <Text style={styles.menuItemText}>{place.title}</Text>
                </View>
              )
            })}
          </View>
          :
          <View></View>
        }
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