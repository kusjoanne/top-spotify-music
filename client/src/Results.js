import React, {useState} from 'react';
import Artist from './Artist';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Results(props){
  const [songlink, setSongLink] = useState(null);
  let audio = props.audio;

  function playAudio(audiolink){
    //if the song clicked is the same as the song that was playing
    if(audiolink === songlink){
       if (audio.paused){
        audio.play();
      } else{
        audio.pause();
      }
    //if the song clicked is different than the one that was previously clicked
  } else {
      if(audio){
        audio.pause();
      }
      setSongLink(audiolink);
      audio = new Audio(audiolink);
      audio.volume = 0.5;
      audio.play();
      props.setAudio(audio);
    }
  }

  return <Container>
    <Row className="show-grid">
      {props.results.map( (result, index) => {
        return <Artist key={index} result={result} playAudio={playAudio} playing={audio}/>;
      })}
    </Row>
  </Container>
}

export default Results;
