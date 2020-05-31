import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button';

function QuerySelector(props){
  const time_range_options = ['WEEKS','MONTHS','YEARS'];
  const result_count_options = ['5','10','15','20','25'];
  const query_type_options = ['ARTISTS', 'TRACKS'];

  const [timeRange, setTimeRange] = useState(time_range_options[0]);
  const [resultCount, setResultCount] = useState(result_count_options[0]);
  const [queryType, setQueryType] = useState(query_type_options[0]);

  return <div className='query'>
    <h3 className="queryStatement"> SHOW MY TOP </h3>
    <DropdownButton className='querySelector' size="lg" onSelect={tr => setResultCount(tr)} title={resultCount}>
      {result_count_options.map(option =>{
        return <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
      })}
    </DropdownButton>
    <DropdownButton className='querySelector' size="lg" onSelect={tr => setQueryType(tr)} title={queryType}>
      {query_type_options.map(option =>{
        return <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
      })}
    </DropdownButton>
    <h3 className="queryStatement"> WITHIN THE LAST FEW</h3>
    <DropdownButton className='querySelector' size="lg" onSelect={tr => setTimeRange(tr)} title={timeRange}>
      {time_range_options.map(option =>{
        return <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
      })}
    </DropdownButton>
    <Button variant="light" size="lg" onClick={props.getReults.bind(this,timeRange,resultCount,queryType)}>Submit</Button>
  </div>
}

export default QuerySelector;
