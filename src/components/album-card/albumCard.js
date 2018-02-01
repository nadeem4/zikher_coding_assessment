import React, { Component } from 'react';
import spotify from '../../images/spotify.jpg';
import like from '../../images/like.png';
import like_active from '../../images/like_active.png';
import '../album-card/albumCard.css'
import rate from '../../images/rate.png';
import rated from '../../images/rated.png';
import save from '../../images/save.png';
import saved from '../../images/saved.png';

export class AlbumCard extends Component {

    constructor(props) {
        super();
        this.state = {
            id: '',
            like: false,
            save: false,
            oneStar: false,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            fiveStar: false
        }
    }

    likeUnlike() {
        this.setState({
            like: !this.state.like
        })
    }

    save() {
        this.setState({
            save : !this.state.save
        }) 
    }
    giveOneStar() {
        this.setState({
            oneStar: true,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            fiveStar: false
        })
    }
    giveTwoStar() {
        this.setState({
            twoStar:true,
            oneStar: true,
            threeStar: false,
            fourStar: false,
            fiveStar: false
        })
    }
    giveThreeStar() {
        this.setState({
            twoStar:true,
            oneStar: true,
            threeStar: true,
            fourStar: false,
            fiveStar: false
        })
    }
    giveFourStar() {
        this.setState({
            twoStar:true,
            oneStar: true,
            threeStar: true,
            fourStar: true,
            fiveStar: false
        })
    }
    giveFiveStar() {
        this.setState({
            twoStar:true,
            oneStar: true,
            threeStar: true,
            fourStar: true,
            fiveStar: true
        })
    }

    render() {
        return (
            <div  className="album-card">
                <div className="image-wrapper">
                    <img src={this.props.image === undefined ? spotify : this.props.image.url }  />
                </div>
                <h1 className="name">{this.props.name}</h1>
                <h3  className="genres"> Genres: 
                    {this.props.genres.map( (genre, i) => 
                        <span key={i} className="genre">{ genre }</span>   
                    )}
                </h3>
                <p className="rating">
                    <span>
                        <img src={ this.state.oneStar ? rated : rate} onClick={() => { this.giveOneStar()}} />
                    </span>
                    <span>
                        <img src={this.state.twoStar ? rated : rate} onClick={() => { this.giveTwoStar()}}/>
                    </span>
                    <span>
                        <img src={this.state.threeStar ? rated : rate} onClick={() => { this.giveThreeStar()}}/>
                    </span>
                    <span>
                        <img src={this.state.fourStar ? rated : rate} onClick={() => { this.giveFourStar()}}/>
                    </span>
                    <span>
                        <img src={this.state.fiveStar ? rated : rate} onClick={() => { this.giveFiveStar()}}/>
                    </span>
                </p>
                <div className="action-count">
                    <span className="followers">{this.props.followers} {this.props.followers > 1 ? 'followers': 'follower' } </span>
                </div>
                
                <div className="action">
                    <img 
                        src={ !this.state.like ? like : like_active}  
                        onClick={ ( ) =>{ this.likeUnlike() }}
                    />
                    <img src={ this.state.save ? saved : save} onClick={ ( ) => { this.save() }}/>
                </div>
            </div>            
        )
    }
}