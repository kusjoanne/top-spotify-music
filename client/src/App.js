import React, {useState, useEffect} from 'react';
import Artist from './Artist';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');


function App() {
  const spotifyApi = new SpotifyWebApi();

  const [token, setToken] = useState(getHashParams());
  const [loggedIn, setLoggedIn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({name: 'Not Checked', albumArt: ''});
  const [allArtists, setArtists] = useState([]);
  const [allTracks, setTracks] = useState([]);

  useEffect(()=>{
    if(Object.keys(token).length > 0){
      setLoggedIn(true);
      spotifyApi.setAccessToken(token.access_token);
    }
  })

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return (hashParams);
  }

  function getTopArtists(){
    axios.get('https://api.spotify.com/v1/me/top/artists',{headers:{'Authorization': 'Bearer ' + token.access_token}}).then( res => {
      let artistArray = [];
      let artists = res.data.items;
      artists.forEach( artist => {
        artistArray.push({artistName: artist.name, albumArt:artist.images[2].url});
      });
      setArtists(artistArray);
    }).catch(err => {
      console.log(err);
    })
  }

  function getTopTracks(){
    axios.get('https://api.spotify.com/v1/me/top/tracks',{headers:{'Authorization': 'Bearer ' + token.access_token}}).then( res => {
      let tracksArray = [];
      let tracks = res.data.items;
      console.log(tracks);
      tracks.forEach( track => {
      tracksArray.push({trackName: track.name, artist: track.artists[0].name, albumArt: track.album.images[0].url});
      });
      setTracks(tracksArray);
    }).catch(err => {
      console.log(err);
    })
  }

  return <div className='App'>
    { !loggedIn && <a href='http://localhost:5000/login'> Login to Spotify </a>}
    { loggedIn && <Button variant="outline-primary" onClick={getTopArtists}>Check Top Artists</Button>}
    { loggedIn && <Button variant="outline-primary" onClick={getTopTracks}>Check Top Tracks</Button>}
    <Container>
      <CardDeck>
        {allArtists.map( (artist, index) => {
          return <Artist key={index} artistName={artist.artistName} albumArt={artist.albumArt}/>;
        })}
      </CardDeck>
    </Container>

  </div>

}

export default App;
