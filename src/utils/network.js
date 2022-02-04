let db = {
  rooms: [],
};

export const createGame = async () => {
  let roomId = Math.random();
  console.log('room id ===', roomId);
  let newRoom = {
    _id: roomId,
    currentState: [null, null, null, null, null, null, null, null, null],
    currentTurn: 'X',
    result: null,
  };
  db.rooms.push(newRoom);
  return newRoom;
};

export const updateCurrentState = async (position, roomId) => {
  // update in db
  let currentRoom = db.rooms.filter(obj => obj._id == roomId);
  // update current state position
  let exactPostion = currentRoom[0].currentState[position];
  if (exactPostion == null) {
    currentRoom[0].currentState[position] = currentRoom[0].currentTurn;
    if (currentRoom[0].currentTurn === 'X') {
      currentRoom[0].currentTurn = 'O';
    } else {
      currentRoom[0].currentTurn = 'X';
    }
  }
  return currentRoom[0];
};

export const calculateWinner = async (roomId) => {
    let currentRoom = db.rooms.filter(obj => obj._id == roomId);
    let squares = currentRoom[0].currentState
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // update winner in db
      currentRoom[0].result = squares[a];
      return squares[a];
    }
  }
  return null;
};
