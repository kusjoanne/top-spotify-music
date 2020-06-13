import React from 'react';
import Artist from './Artist';
import Grid from 'react-bootstrap/Grid';
import Row from 'react-bootstrap/Row';

function Results(props){
  console.log(props);
//   return <div class="container">
//   <div class="row">
//     {props.results.map( (result, index) => {
//         return <Artist key={index} result={result} />;
//       })}
//   </div>
// </div>

  return <Grid>
    <Row className="show-grid">
      {props.results.map( (result, index) => {
        return <Artist key={index} result={result} />;
      })}
    </Row>
  </Grid>
}

export default Results;
