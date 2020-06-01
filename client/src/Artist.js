import React from 'react';
import Card from 'react-bootstrap/Card';
import { flipInX } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

function Artist(props){

  const styles = {
    flipInX: {
      animation: '1s',
      animationName: Radium.keyframes(flipInX, 'flipInX'),
      width: '12rem',
    }
  }

  //figure out how to stop playing existing audio if anyother is clicked
  //move this to the parent and have there be 1 audio var?
  //also some tracks don't have a preview_url so......
  //On hover display "No Audio Preview"
  function playAudio(audiolink){
    let audio = new Audio(audiolink);
    audio.play();
  }

  return <StyleRoot>
    <div className="deviceCard col-3 mb-3" style={styles.flipInX}>
      <Card style={{ width: '12rem' }}>
        <Card.Img className='albumArt' variant="top" onClick={playAudio.bind(this,props.result.previewUrl)} src={props.result.albumArt} />
        <Card.Body>
          <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
          {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
        </Card.Body>
      </Card>
    </div>
    {console.log(props)}
  </StyleRoot>
}

export default Artist;
