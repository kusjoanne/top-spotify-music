import React, {useState, useEffect} from 'react';
import Artist from './Artist';
import QuerySelector from './QuerySelector';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');


function App() {
  const spotifyApi = new SpotifyWebApi();

  const [token, setToken] = useState(getHashParams());
  const [loggedIn, setLoggedIn] = useState(false);
  const [results, setResults] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);
  let audio = null;

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

  function playAudio(audiolink){
    if(audio){
      audio.pause();
    }
    audio = new Audio(audiolink);
    audio.play();
  }

  function getReults(timeRange,resultCount,queryType){
    queryType = queryType.toLowerCase();
    if(timeRange==='WEEKS'){
      timeRange = 'short_term';
    } else if(timeRange==='MONTHS'){
      timeRange = 'medium_term';
    } else if(timeRange==='YEARS'){
      timeRange = 'long_term';
    }

    axios.get(`https://api.spotify.com/v1/me/top/${queryType}?limit=${resultCount}&time_range=${timeRange}`,{headers:{'Authorization': 'Bearer ' + token.access_token}}).then( res => {
      let resultsArray = [];
      let apiResults = res.data.items;
      if(queryType==='artists'){
        apiResults.forEach( result => {
          // let preview_url =  getTopArtistTrack(result.id);
          // console.log(preview_url);
          resultsArray.push({artistName: result.name, albumArt:result.images[1].url});
        });
      } else if (queryType === 'tracks'){
        apiResults.forEach( result => {
          resultsArray.push({trackName: result.name, albumArt:result.album.images[1].url, artistName:result.artists[0].name, previewUrl:result.preview_url});
        });
      }
      setResults(resultsArray);
      audio.pause();
    }).catch(err => {
      console.log(err);
    })
  }

  // async function getTopArtistTrack(artist_id){
  //   await axios.get(`https://api.spotify.com/v1/artists/${artist_id}/top-tracks?country=US`,{headers:{'Authorization': 'Bearer ' + token.access_token}}).then( response => {
  //     let apiResults = response.data;
  //     console.log(apiResults.tracks[0].preview_url);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  return <div className='App'>
    <h1 style={{fontSize: '4.5rem'}}>MY TOP SPOTFIY MUSIC</h1>
    { !loggedIn && <div className="login"><Button variant="light" size="lg" href='http://localhost:5000/login'> LOG INTO SPOTIFY </Button></div>}
    { loggedIn && <QuerySelector getReults={getReults}/>}
    <Container className='results'>
      <CardDeck>
        {results.map( (result, index) => {
          return <Artist key={index} result={result} playAudio={playAudio}/>;
        })}
      </CardDeck>
    </Container>
    {/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
  </div>

}

export default App;
