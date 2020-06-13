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
  // <div className="deviceCard col-3 mb-3" style={styles.flipInX}>
    // <Card style={{ width: '12rem' }}>
    //   <div className="cardImg">
    //     <Card.Img className='albumArt' variant="top" src={props.result.albumArt} />
    //     <div className="middle">
    //       <img className="playbtn" alt="playButton" src="https://image.flaticon.com/icons/png/512/907/907754.png"></img>
    //     </div>
    //   </div>
    //   <Card.Body>
    //     <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
    //     {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
    //   </Card.Body>
    // </Card>
  // </div>

  //onClick={props.playAudio.bind(this,props.result.previewUrl)}
  return <StyleRoot>
    <div class="col-sm-6 col-lg-3 py-2">
    <Card className="h-100">
      <div className="cardImg">
        <Card.Img className='albumArt' variant="top" src={props.result.albumArt} />
        <div className="middle">
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
