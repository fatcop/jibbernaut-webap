// Reducers

import { combineReducers } from 'redux';

const chatMessage = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        id: action.id,
        text: action.text,
        from: action.from,
        viewed: action.viewed,
        time: action.time
      }
    case 'VIEW_MESSAGE':
      if (state.id !== action.id) { 
        return state;
      }
      return {
        ...state,
        viewed: true
      };
    default:
      return state;
  }
};

const chatMessages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
      ...state,
      chatMessage(undefined, action)
      ];
    case 'VIEW_MESSAGE':
      return state.map(msg =>
        chatMessage(msg, action)
      );
    default:
      return state;
  }
};

const channel = (state, action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return {
        // TODO: The id will be eventually created by server
        // id: action.id, 
        name: action.name,
        active: false,
        favourite: typeof action.favourite !== 'undefined' && action.favourite
      }
    default:
      return state;
  }
};

const channels = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHANNEL':
      return [
      ...state,
      channel(undefined, action)
      ];
    case 'REMOVE_CHANNEL':
      return state.filter(channel => channel.name !== action.name)
    default:
      return state;
  }
};

const userProfile = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        username: action.name
      }
    default:
      return state;
  }
}

const session = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHANNEL':
      return {
        ...state,
        channel: action.channelName // TODO: Should use id when available
      }
    default:
      return state;
  }
}

const visibilityFilters = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// Combined reducers

export default combineReducers({
	visibilityFilters,
  userProfile,
  chatMessages,
  channels,
  session
});
