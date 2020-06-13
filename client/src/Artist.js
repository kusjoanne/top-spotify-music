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
  //   <Card style={{ width: '12rem' }}>
  //     <div className="cardImg">
  //       <Card.Img className='albumArt' variant="top" src={props.result.albumArt} />
  //       <div className="middle">
  //         <img className="playbtn" alt="playButton" src="https://image.flaticon.com/icons/png/512/907/907754.png"></img>
  //       </div>
  //     </div>
  //     <Card.Body>
  //       <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
  //       {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
  //     </Card.Body>
  //   </Card>
  // </div>

  //onClick={props.playAudio.bind(this,props.result.previewUrl)}
  return <StyleRoot>
    <div class="col-sm-6 col-lg-3 py-2">
        <div class="card h-100">
            <img class="card-img-top img-fluid" src="//placehold.it/500x200" alt="Card image cap"></img>
            <div class="card-body">
                <h4 class="card-title">Card title</h4>
                <p>This is a longer card with supporting text below as a natural.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
  </StyleRoot>
}

export default Artist;
