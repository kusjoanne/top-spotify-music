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
    }
  }
  // this goes in Card.Img className='albumArt
  //onClick={props.playAudio.bind(this,props.result.previewUrl)}

  //this goes after StyleRoot
  // <div className="deviceCard col-3 mb-3" style={styles.flipInX}>

  return <StyleRoot>
    <Col md={4}>
      <Card style={{ width: '12rem' }}>
        <div className="cardImg">
          <Card.Img className='albumArt' variant="top" src={props.result.albumArt} onClick={props.playAudio.bind(this,props.result.previewUrl)}/>
          <div className="middle">
            <img className="playbtn" alt="playButton" src="https://image.flaticon.com/icons/png/512/907/907754.png"></img>
          </div>
        </div>
        <Card.Body>
          <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
          {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
        </Card.Body>
      </Card>
    </Col>
  </StyleRoot>
}

export default Artist;
//
// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import { flipInX } from 'react-animations';
// import Radium, {StyleRoot} from 'radium';
// import Col from 'react-bootstrap/Col';
//
// function Artist(props){
//
//   const styles = {
//     flipInX: {
//       animation: '1s',
//       animationName: Radium.keyframes(flipInX, 'flipInX'),
//       width: '12rem',
//     }
//   }
//   // this goes in Card.Img className='albumArt
//   //onClick={props.playAudio.bind(this,props.result.previewUrl)}
//
//   //this goes after StyleRoot
//   // <div className="deviceCard col-3 mb-3" style={styles.flipInX}>
//
//   return <StyleRoot>
//     <Col md={4}>
//       <Card style={{ width: '12rem' }}>
//         <div className="cardImg">
//           <Card.Img className='albumArt' variant="top" src={props.result.albumArt} />
//           <div className="middle">
//             <img className="playbtn" alt="playButton" src="https://image.flaticon.com/icons/png/512/907/907754.png"></img>
//           </div>
//         </div>
//         <Card.Body>
//           <Card.Title style={styles.flipInX}>{props.result.artistName}</Card.Title>
//           {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
//         </Card.Body>
//       </Card>
//     </Col>
//   </StyleRoot>
// }
//
// export default Artist;
