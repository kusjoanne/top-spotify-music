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

  return <StyleRoot>
    <div className="deviceCard col-3 mb-3" style={styles.flipInX}>
      <Card style={{ width: '12rem' }}>
        <div class="cardImg" onClick={props.playAudio.bind(this,props.result.previewUrl)}>
          <Card.Img className='albumArt' variant="top" src={props.result.albumArt} />
          <div class="middle">
            <img className="playbtn" alt="playButton" src="https://image.flaticon.com/icons/png/512/907/907754.png"></img>
          </div>
        </div>
        <Card.Body>
          <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
          {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
        </Card.Body>
      </Card>
    </div>
  </StyleRoot>
}

export default Artist;
