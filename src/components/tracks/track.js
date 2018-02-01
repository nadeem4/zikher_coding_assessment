import React, { Component } from 'react';
import spotify from '../../images/spotify.jpg';
import like from '../../images/like.png';
import like_active from '../../images/like_active.png';
import { TrackCard } from '../track-card/trackCard'
import '../tracks/track.css'

export class Track extends Component {
    constructor(props) {
        super();
        this.state = {
            sortedTracks: props.tracks
        }
    }

    sortAlbum( ) {
        let value = document.getElementById('sortTracks').value;
        if( value === 'by Name'){
            this.setState({
                sortedTracks: this.props.tracks.sort(function(a, b){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })
            })
        }
        if( value === 'by Album Name'){
            this.setState({
                sortedTracks: this.props.tracks.sort(function(a, b){
                    if(a.album.name < b.album.name) return -1;
                    if(a.album.name > b.album.name) return 1;
                    return 0;
                })
            })
        }
        if( value == 'by Duration') {
            this.setState({
                sortedTracks: this.props.tracks.sort(function(a, b){
                    if(a.duration_ms < b.duration_ms) return -1;
                    if(a.duration_ms > b.duration_ms) return 1;
                    return 0;
                })
            })
        }
        if( value === 'by Popularity') {
            this.setState({
                sortedTracks: this.props.tracks.sort(function(a, b){
                    if(a.popularity < b.popularity) return -1;
                    if(a.popularity > b.popularity) return 1;
                    return 0;
                })
            })
        }
        
    }

    render() {
        console.log(this.props);
        if(this.props.isloaded) {
            return(
                <div className="track">
                    <h1>Tracks</h1>
                    <span className="sorting">
                        sort: 
                        <select  id="sortTracks" onChange={ () => { this.sortAlbum( )}}>
                            <option value="by Name"> by Name </option>
                            <option value="by Album Name"> by Album Name </option>
                            <option value="by Duration"> by Duration </option>
                            <option value="by Popularity"> by Popularity </option>
                        </select>
                    </span>
                    { this.props.tracks.map( (track, i) =>
                     <TrackCard key={i}
                        image={ track.album.images[0] }
                        trackName={track.name}
                        albumName={track.album.name}
                        duration={track.duration_ms}
                        artists={track.artists}
                     />
                    )}
                </div>
            );
        } else {
            return(
                <div className="tarcks-not-loaded">
                   Tracks are loading....
                </div>
            );
        }
    }
}