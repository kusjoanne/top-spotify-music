import React, {useState, useEffect} from 'react';
const SpotifyWebApi = require('spotify-web-api-node');
const queryString = require('query-string');
const axios = require('axios');

function App() {
  const spotifyApi = new SpotifyWebApi();

  const [token, setToken] = useState(getHashParams());
  const [loggedIn, setLoggedIn] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({name: 'Not Checked', albumArt: ''});
  const [allArtists, setArtists] = useState([]);

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

  function getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState({
    })
    .then(function(data) {
      if(data.statusCode === 200){
        if(data.body.item){
          setNowPlaying({name: data.body.item.artists[0].name, albumArt: data.body.item.album.images[0].url});
        } else {
          setNowPlaying({name: "A PODCAST"});
        }
      } else {
        setNowPlaying({name: "NOTHING"});
      }
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  }

  function getTopArtists(){
    axios.get('https://api.spotify.com/v1/me/top/artists',{headers:{'Authorization': 'Bearer ' + token.access_token}}).then( res => {
      console.log(res.data);
      let artistArray = [];
      let artists = res.data.items;
      artists.forEach( artist => {
        artistArray.push(artist.name);
      });
      setArtists(artistArray);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className='App'>
      <p>{loggedIn.toString()}</p>
      { !loggedIn && <a href='http://localhost:5000/login'> Login to Spotify </a>}
      { loggedIn && <button onClick={getTopArtists}>Check Now Playing</button>}
      <div>
        Now Playing: {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.albumArt} style={{ height: 150 }}/>
      </div>
      <div>
        <p> {allArtists} </p>
      </div>
    </div>
  );
}

export default App;
