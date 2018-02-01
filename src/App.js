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
  
  };
  
  componentWillMount() {
    let that = this;
    unirest.get(`https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=20&offset=5`)
    .headers({'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer BQAinokAhn_bAaKt5MTvgvALNtQWCRsq7ZDrMV-P9CnwJ4gGX3cxw1GnrDzg1-vS92Bi-pUnbzZ5At-R3delMd9TmrmH83VN0FCcxsvRsxlOFmwYs9_58SBA0IWuvvxFdPfddWDyn54X1IZfo7ko-J0SUjMiUMFEz7VudckFU4TizzkZ2BdpNg_GFRwRjsaw4q5X30JwKAGGr1I2sps2zcIHHQvW_ls3esJPY4eeMvk_Y_NldLSn61q03tf9cwyfjspwNK1XujKKT7OGCA'})
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
              'Authorization': 'Bearer BQAinokAhn_bAaKt5MTvgvALNtQWCRsq7ZDrMV-P9CnwJ4gGX3cxw1GnrDzg1-vS92Bi-pUnbzZ5At-R3delMd9TmrmH83VN0FCcxsvRsxlOFmwYs9_58SBA0IWuvvxFdPfddWDyn54X1IZfo7ko-J0SUjMiUMFEz7VudckFU4TizzkZ2BdpNg_GFRwRjsaw4q5X30JwKAGGr1I2sps2zcIHHQvW_ls3esJPY4eeMvk_Y_NldLSn61q03tf9cwyfjspwNK1XujKKT7OGCA'})
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
