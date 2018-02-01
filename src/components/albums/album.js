import React, { Component } from 'react';
import '../albums/album.css'
import {AlbumCard} from '../album-card/albumCard'
import '../../index.css'
import spinner from '../../images/spinner.gif'

export class Album extends Component {

    constructor(props) {
        super();
        this.state = {
            sortedAlbum: props.albums
        }
    }


    likeAlbum(i) {
        console.log(i,"liked")
    }

    commentAlbum() {
        this.setState({
            commentBox: true
        })
    }

    sortAlbum( ) {
        let value = document.getElementById('sort').value;
        if( value === 'by Name'){
            this.setState({
                sortedAlbum: this.props.albums.sort(function(a, b){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })
            })
        }
        if( value == 'by Followers') {
            this.setState({
                sortedAlbum: this.props.albums.sort(function(a, b){
                    if(a.followers.total < b.followers.total) return -1;
                    if(a.followers.total > b.followers.total) return 1;
                    return 0;
                })
            })
        }
        if( value === 'by Popularity') {
            this.setState({
                sortedAlbum: this.props.albums.sort(function(a, b){
                    if(a.popularity < b.popularity) return -1;
                    if(a.popularity > b.popularity) return 1;
                    return 0;
                })
            })
        }
        
    }

    render() {
        if(this.props.isloaded) {
            return(
                <div className="album">
                    <h1>Albums</h1>
                    <span className="sorting">
                        sort: 
                        <select  id="sort" onChange={ () => { this.sortAlbum( )}}>
                            <option value="by Name"> by Name </option>
                            <option value="by Followers"> by Followers </option>
                            <option value="by Popularity"> by Popularity </option>
                        </select>
                    </span>
                    {this.props.albums.map((album, i) => 
                        <AlbumCard key={i}
                            id={i}
                            image={album.images[0]}
                            name={album.name}
                            genres={album.genres}
                            followers={album.followers.total}
                        />
                    )}
                </div>
            );
        } else {
            return(
                <div className="albums-not-loaded">
                   Albums are loading......
                    <div className="spinner">
                        <img src={spinner}/>
                    </div>
                </div>
            );
        }
    }
}