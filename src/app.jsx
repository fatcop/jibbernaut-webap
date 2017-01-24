import styles from './index.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage, setChannel } from './actions.js'
import * as api from './api.js';

const Username = (props) => {
  let status = props.isOnline ? 'online' : 'offline';
  return (
    <span className={`username ${status}`}>{ props.name }</span>
  )
};

const Channel = (props) => {
  return (
    <div className="channel"># { props.name }</div>
  )
};

class ChannelFilter extends React.Component {
  render() {
    const { props } = this;
    let channels = props.channels.filter((channel) => channel.favourite === props.favourite);
    return (
      <ul>
      { channels.map((channel) => {
        return (
          <li className={channel.name === props.session.channel ? 'active':''} key={channel.name}>
            <a href="#" onClick={(ev) => props.onSetChannel(ev, channel.name)}>
              <Channel name={channel.name} />
            </a>
          </li>
        )
      })}
      </ul>
    )
  }
}

const MapChannelStateToProps = (state) => {
  return {
    session: state.session,
    channels: state.channels
 }
}

const mapChannelDispatchToProps = (dispatch, props, state) => {
  return {
    onSetChannel: (ev, channelName) => {
      ev.preventDefault();
      dispatch(setChannel(channelName));
    }
  }
};

const Channels = connect(
  MapChannelStateToProps,
  mapChannelDispatchToProps
)(ChannelFilter);

const FavouriteChannels = () => {
 return (
  <Channels favourite={true} />
 )
}

const NonFavouriteChannels = () => {
 return (
  <Channels favourite={false} />
  )
}

class App extends React.Component {
  
  constructor() {
    super();
  }

  sendMessage(e) {
    e.preventDefault();
    this.props.onSendMessage(this.userInput.value, this.props.userProfile.username);
    this.userInput.value = '';
  }
  componentDidUpdate(prevProps) {
    // Scroll the viewport to the bottom to show new messages
    if (this.props.messages.length !== prevProps.messages.length) {
      this.viewport.scrollIntoView({block:'end'});
    }
  }
  render() {
    
    let { messages, channels, session, onSendMessage, userProfile } = this.props;
    let { username } = userProfile;

    return (
      <div className="chat">
        <header className="header">
          <h1>JibberNaut <small> - Yeah it&apos;s a Slack clone ;)</small></h1>
        </header>
        <div className="body">
          <div className="sidebar">

            <div className="sidebar-block">
              <div className="user-status">
                <Username name={username} isOnline={true} />
              </div>
            </div>

            <div className="sidebar-block">
              <h1>Starred</h1>
              <FavouriteChannels />
            </div>

            <div className="sidebar-block">
              <h1>Channels <small>({channels.length})</small></h1>
              <NonFavouriteChannels />
            </div>

            <div className="sidebar-block">
              <h1>Direct Messages</h1>
              <ul>
                <li><a href="#">
                  <Username name={'nautbot'} isOnline={false} />
                </a></li>
                <li><a href="#">
                  <Username name={username} isOnline={true} /> (you)
                </a></li>
              </ul>
            </div>
          </div>
          <div className="main">
            <div className="viewport">
            { messages.map((msg) => {
             return (
              <div key={msg.id} className="message">
                <div className="from">{ msg.from }</div>
                <div className="text">{ msg.text }</div>
              </div>
             )
            })}
              <div ref={ (ref) => { this.viewport = ref; } }></div>
            </div>
            <div className="user-input">
              <div className="input-group">
                <form onSubmit={this.sendMessage.bind(this)}>
                  <button className="input-btn" type="submit">+</button>
                  <input type="text"
                   ref={ (ref) => { this.userInput = ref; } }
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
    messages: state.chatMessages,
    channels: state.channels,
    session: state.session
  }
};

const mapDispatchToProps = (dispatch, props, state) => {
  return {
    onSendMessage: (message, from) => {
      api.sendMessage(message, from);
      dispatch(addMessage(message, from));
    }
  }
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(App);
