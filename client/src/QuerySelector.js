import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

function QuerySelector(props){
  const time_range_options = ['short_term','medium_term','long_term'];
  const result_count_options = ['5','10','15','20','25'];
  const query_type_options = ['artists', 'tracks'];

  const [timeRange, setTimeRange] = useState(time_range_options[0]);
  const [resultCount, setResultCount] = useState(result_count_options[0]);
  const [queryType, setQueryType] = useState(query_type_options[0]);

  return <div className='query'>
    <Dropdown className='querySelector'>
      <Dropdown.Toggle>
        {timeRange}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {time_range_options.map( option => {
          return <Dropdown.Item>{option}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown className='querySelector'>
      <Dropdown.Toggle>
        {resultCount}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {result_count_options.map( option => {
          return <Dropdown.Item>{option}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown className='querySelector'>
      <Dropdown.Toggle>
        {queryType}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {query_type_options.map( option => {
          return <Dropdown.Item>{option}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown>
    <Button variant="outline-primary" onClick={props.runQuery.bind(this,timeRange,resultCount,queryType)}>Get Results</Button>
  </div>
}

export default QuerySelector;
