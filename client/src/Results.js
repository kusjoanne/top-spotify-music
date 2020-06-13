import React from 'react';
import Artist from './Artist';

function Results(props){
  console.log(props);
  return <div class="container">
  <div class="row">
    {props.results.map( (result, index) => {
        return <Artist key={index} result={result} />;
      })}
  </div>
</div>
}

export default Results;
