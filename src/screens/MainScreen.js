import { Dimensions, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useState, useEffect} from 'react';

import zeroImage from '../assets/images/zero.png'
import crossImage from '../assets/images/cross.png'
import resetimage from '../assets/images/reset.png'
const windowWidth = Dimensions.get('window').width;


export default function MainScreen() {
    const [currentTurn, setCurrentTurn] = useState('X')
    const [boxes, setboxes] = useState([
      null, null, null,
      null, null, null,
      null, null, null
    ])
  
    const markPosition = (position) => {
      if(!boxes[position]){
        let temp = [...boxes]
        temp[position] = currentTurn
        setboxes(temp)
        if(currentTurn === 'X'){  //transfer chances to next player
          setCurrentTurn('O')
        }else{
          setCurrentTurn('X')
        }
      }
    }
  
    const resetboxes = () => {
      setboxes([
        null, null, null,
        null, null, null,
        null, null, null
      ])
    }
  
    const calculateWinner = (squares) => {
      const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      for(let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          return squares[a];
        }
      }
      return null;
    }
  
    useEffect(() => {
      const winner = calculateWinner(boxes);
      if(winner === 'X'){
        alert("Player X Won!")
        resetboxes()
      }else if(winner === 'O'){
        alert("Player O Won!")
        resetboxes()
      }
    }, [boxes])
    
    return (
      <SafeAreaView style={styles.body}>
        
        <View style={styles.mainContainer}>
  
          {/* Top Left Cell */}
          <TouchableOpacity style={styles.cell_top_left} onPress={()=>markPosition(0)}>
            {boxes[0] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[0] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Top Mid Cell */}
          <TouchableOpacity style={styles.cell_top_mid} onPress={()=>markPosition(1)}>
            {boxes[1] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[1] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Top Right Cell */}
          <TouchableOpacity style={styles.cell_top_right} onPress={()=>markPosition(2)}>
            {boxes[2] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[2] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Mid Left Cell */}
          <TouchableOpacity style={styles.cell_mid_left} onPress={()=>markPosition(3)}>
            {boxes[3] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[3] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Mid Mid Cell */}
          <TouchableOpacity style={styles.cell_mid_mid} onPress={()=>markPosition(4)}>
            {boxes[4] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[4] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Mid Right Cell */}
          <TouchableOpacity style={styles.cell_mid_right} onPress={()=>markPosition(5)}>
            {boxes[5] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[5] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Bottom Left Cell */}
          <TouchableOpacity style={styles.cell_bottom_left} onPress={()=>markPosition(6)}>
            {boxes[6] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[6] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Bottom Mid Cell */}
          <TouchableOpacity style={styles.cell_bottom_mid} onPress={()=>markPosition(7)}>
            {boxes[7] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[7] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
  
          {/* Bottom Right Cell */}
          <TouchableOpacity style={styles.cell_bottom_right} onPress={()=>markPosition(8)}>
            {boxes[8] === 'X' && <Image source={crossImage} style={styles.icon} />}
            {boxes[8] === 'O' && <Image source={zeroImage} style={styles.icon} />}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancleBTN} onPress={resetboxes}>
          <Image source={resetimage} style={styles.cancelIcon}/>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
    
  const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#fff'
    },
    playerInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 20,
      marginTop: 30
    },
    playerTxt: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: 1.2,
      color: '#fff'
    },
    mainContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 120
    },
    cell_top_left: {
      width: windowWidth / 3.2,
      height: windowWidth / 3.2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 6,
      borderBottomWidth: 6
    },
    cell_top_mid: {
      width: windowWidth / 3.2,
      height: windowWidth / 3.2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 6
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
      width: 62
    },
    cancleBTN: {
      position: 'absolute',
      top: 10,
      right: 20
    },
    cancelIcon: {
      height: 50,
      width: 50
    }
  })
