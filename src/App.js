import React, { Component } from 'react';
import * as unirest from 'unirest';
import './App.css';
import { Album } from './components/albums/album';
import { Track } from './components/tracks/track';
import { error } from 'util';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      albums: [],
      tracks: [],
      errorMessage: ''
    }
    this.accessToken = 'BQCr3FXsINRMSsQci7KUgxy1ZE94J58auHo9SJTubLsf4XsahOqZOu-Lx4kEeh1SUKihkC2SyEzkYnLQZ5PnoBwEebe8nlzLqn2orKfF4_66W90zCIS3aLWZSt-nWPNNexxVdVx_eoEZ5-LWXXPkkpEUkOfCV4eL3UrnLxHE61IXiTkS_15S45ATTNPz-xztDGkNk-B1gQMoTWsQneGeVUmb7z8o37upowOQZ3hqrdBJxDKrGz_bFeiARVNREPdk316V0giznRDm_odCog'
  
  };
  
  componentWillMount() {
    let that = this;
    unirest.get(`https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=20&offset=5`)
    .headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${this.accessToken} `})
    .end(function (response) {
      console.log(response.body);
      if(response.body.error){
        that.setState({
          error: true,
          errorMessage: response.body.error.message,
        })
      } else {
        that.addAlbums(response.body.artists.items.sort(function(a, b){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        }))
        that.addtracks(response.body.tracks.items.sort(function(a, b){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        }))
      }
     
    });
  }

  search = () => {
    this.setState({
      isLoaded : false
    })
    let val = document.getElementById('musicSearch').value;
    let that = this;
    unirest.get(`https://api.spotify.com/v1/search?q=${val}&type=track%2Cartist&market=US&limit=20&offset=5`)
    .headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':  `Bearer ${this.accessToken} `})
    .end(function (response) {
      if(response.body.error){
          that.setState({
            error: true,
            errorMessage: response.error.message,
          })
      }else {
        that.addAlbums(response.body.artists.items)
        that.addtracks(response.body.tracks.items)
      }
    });
  }
  
  addAlbums(albums) {
    this.setState({
      isLoaded : true,
      albums : albums
    })
    console.log(albums)
  }

  addtracks(tracks) {
    this.setState({
      tracks : tracks
    })
    console.log(tracks)
  }

  render() {
    if(this.state.error){
      return(
        <h1>{this.state.errorMessage}</h1>
      )

    }else{
      return (
        <div className="App">
          <header>
            <input type="text" id="musicSearch" placeholder="Search Albums and Tracks"/>
            <button onClick={ () => this.search()} > Search </button>
          </header>
          <div className="albums-wrapper">
            <Album albums={this.state.albums} isloaded={this.state.isLoaded} />
          </div>
          <div className="tracks-wrapper">
            <Track tracks={this.state.tracks} isloaded={this.state.isLoaded}/>
          </div>
        </div>
      );
    }

    
  }
}

export default App;
