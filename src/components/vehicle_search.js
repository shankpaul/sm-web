import React,{useState} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; 
import axios from 'axios';

export default function VehicleSearch(props){
	const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleDBSearch = (query) => {
    setIsLoading(true);
    if(query!==''){
	    axios.get('vehicles/search/'+query)
	      .then((resp) => {

	      	const options = resp.data.map((item) => ({
	          reg_number: item.reg_number,
	          id: item.id
	        }));        
	        setOptions(options);
	        setIsLoading(false);
	      });
    }
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  return (
    <AsyncTypeahead
    	{...props}
      filterBy={filterBy}
      id="vehicle-search"
      isLoading={isLoading}
      labelKey="reg_number"
      minLength={0}
      onSearch={handleDBSearch}
      options={options}
      placeholder="Search Vehicles"
      renderMenuItemChildren={(option, props) => (
        <div>
          <span>{option.reg_number}</span>
        </div>
      )}
    />
  );
}




