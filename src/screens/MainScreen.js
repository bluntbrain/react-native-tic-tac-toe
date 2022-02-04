import {
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import zeroImage from '../assets/images/zero.png';
import crossImage from '../assets/images/cross.png';
import resetimage from '../assets/images/reset.png';
import {
  calculateWinner,
  createGame,
  updateCurrentState,
} from '../utils/network';
const windowWidth = Dimensions.get('window').width;


export default function MainScreen() {
  const [boxes, setboxes] = useState(null);
  // const [currentTurn, _switch] = switchTurn();
  const [currentTurn, setCurrentTurn]= useState('X');
  const [isLoading, setIsLoading]= useState(true);

  const [roomId, setRoomId] = useState(null);

  const resetboxes = () => {
    // create game api to reset and create a new game
    createGame().then(res => {
      console.log('new game created ===', res);
      setRoomId(res._id);
      setboxes(res.currentState);
    });
    setboxes(initialState);
  };

  const markPosition = position => {
    // call api to update the boxes
    updateCurrentState(position, roomId).then(res => {
      setboxes(res?.currentState);
      setCurrentTurn(res?.currentTurn)
    });
  };

  useEffect(() => {
    // api call to calculate winner
    calculateWinner(roomId).then(res => {
      let winner = res
      if (winner === 'X') {
        alert('Player X Wins!');
        resetboxes();
      } else if (winner === 'O') {
        alert('Player O Wins!');
        resetboxes();
      } else {
        if (!boxes?.includes(null) && !isLoading) {
          alert("Opps it's a tie!");
        }
      }
    })
    
  }, [boxes]);

  // useEffect(() => {
  //   // call api to get current state
  //   // set current state to usestate
  // }, [currentTurn]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
    createGame().then(res => {
      console.log('new game created ===', res);
      setRoomId(res._id);
      setboxes(res.currentState);
    });
  }, []);
  
  if(isLoading){
    return(
      <View style={{justifyContent:'center', marginTop:300}}>
        <ActivityIndicator color={'#000000'} size={'large'}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.cell_top_left}
          onPress={() => markPosition(0)}>
          {boxes[0] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[0] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_top_mid}
          onPress={() => markPosition(1)}>
          {boxes[1] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[1] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_top_right}
          onPress={() => markPosition(2)}>
          {boxes[2] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[2] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_mid_left}
          onPress={() => markPosition(3)}>
          {boxes[3] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[3] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_mid_mid}
          onPress={() => markPosition(4)}>
          {boxes[4] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[4] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_mid_right}
          onPress={() => markPosition(5)}>
          {boxes[5] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[5] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_bottom_left}
          onPress={() => markPosition(6)}>
          {boxes[6] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[6] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_bottom_mid}
          onPress={() => markPosition(7)}>
          {boxes[7] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[7] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cell_bottom_right}
          onPress={() => markPosition(8)}>
          {boxes[8] === 'X' && (
            <Image source={crossImage} style={styles.icon} />
          )}
          {boxes[8] === 'O' && <Image source={zeroImage} style={styles.icon} />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.cancleBTN} onPress={resetboxes}>
        <Image source={resetimage} style={styles.cancelIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 30,
  },
  playerTxt: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#fff',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 120,
  },
  cell_top_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderBottomWidth: 6,
  },
  cell_top_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
  },
  cell_top_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  cell_mid_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
  },
  cell_mid_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell_mid_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 6,
  },
  cell_bottom_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 6,
    borderTopWidth: 6,
  },
  cell_bottom_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 6,
  },
  cell_bottom_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 6,
    borderTopWidth: 6,
  },
  icon: {
    height: 62,
    width: 62,
  },
  cancleBTN: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  cancelIcon: {
    height: 50,
    width: 50,
  },
});
