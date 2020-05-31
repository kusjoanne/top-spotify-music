import React from 'react';
import Card from 'react-bootstrap/Card';

function Artist(props){

  return <div className="deviceCard col-3 mb-3"><Card style={{ width: '12rem' }}>
    <Card.Img className='albumArt' variant="top" src={props.result.albumArt} />
    <Card.Body>
      <Card.Title className="cardTitle">{props.result.artistName}</Card.Title>
      {props.result.hasOwnProperty('trackName')&& <Card.Subtitle className="mb-2 text-muted cardTitle">{props.result.trackName}</Card.Subtitle>}
    </Card.Body>
  </Card>
  </div>
}

export default Artist;
