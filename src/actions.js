
let messageIdCounter = 0;

export const setUserName = (name) => {
  return {
    type: 'SET_USER_NAME',
    name
  }
}

export const addChannel = (name, favourite) => {
  return {
    type: 'ADD_CHANNEL',
    name,
    favourite
  }
}

export const setChannel = (channelName) => {
  return {
    type: 'SET_CHANNEL',
    channelName
  }
}

export const addMessage = (message, from) => {
  return {
    type: 'ADD_MESSAGE',
    id: messageIdCounter++,
    text: message,
    from,
    viewed: false,
    time: Date.now()
  }
}

export default {
  setUserName,
  addMessage,
  addChannel,
  setChannel
}