import React from 'react';
import Card from 'react-bootstrap/Card';
import { flipInX } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import Col from 'react-bootstrap/Col';

function Artist(props){
  const styles = {
    flipInX: {
      animation: '1s',
      animationName: Radium.keyframes(flipInX, 'flipInX'),
      width: '12rem',
      fontSize: ''
    }
  }

  return <StyleRoot>
    <Col md={4}>
      <div className="card" style={styles.flipInX}>
        <div className="cardImg" onClick={props.playAudio.bind(this,props.result.previewUrl)}>
          <Card.Img className='albumArt' variant="top" src={props.result.albumArt}/>
          <div className="middle">
            <img className="playbtn" alt="playButton" src="https://image.flaticon.com/icons/png/512/907/907754.png"></img>
          </div>
        </div>
        <Card.Body>
          <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
          {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
        </Card.Body>
      </div>
    </Col>
  </StyleRoot>
}

export default Artist;
