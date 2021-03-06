import React, {useState, useEffect} from 'react';
import QuerySelector from './QuerySelector';
import Results from './Results';
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');


function App() {
  const spotifyApi = new SpotifyWebApi();

  const [token, setToken] = useState(getHashParams());
  const [loggedIn, setLoggedIn] = useState(false);
  const [results, setResults] = useState([]);
  const [audio, setAudio] = useState(null);

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
          resultsArray.push({artistName: result.name, albumArt:result.images[1].url, previewUrl:result.id});
        });
      } else if (queryType === 'tracks'){
        apiResults.forEach( result => {
          resultsArray.push({trackName: result.name, albumArt:result.album.images[1].url, artistName:result.artists[0].name, previewUrl:result.preview_url});
        });
        setResults([]);
        setResults(resultsArray);
      }
      if(audio){
        audio.pause();
      }
      return resultsArray;
    }).then( (resultsArray) =>{
      if (queryType === 'artists'){
        let promises = resultsArray.map( result => {
          return axios.get(`https://api.spotify.com/v1/artists/${result.previewUrl}/top-tracks?country=US`,{headers:{'Authorization': 'Bearer ' + token.access_token}})
          .then( response => {
            return response.data.tracks[0].preview_url;
          });
        });
        axios.all(promises)
        .then( urls=>{
          for(let i =0; i< urls.length; i++){
            resultsArray[i].previewUrl = urls[i];
          }
          setResults([]);
          setResults(resultsArray);
        });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return <div className='App'>
    <h1 style={{fontSize: '4.5rem'}}>MY TOP SPOTFIY MUSIC</h1>
    { !loggedIn && <div className="login"><Button variant="light" size="lg" href='/login'> LOG INTO SPOTIFY </Button></div>}
    { loggedIn && <QuerySelector getReults={getReults}/>}
    <Results results={results} audio={audio} setAudio={setAudio}/>
    <Footer/>
  </div>

}

export default App;
