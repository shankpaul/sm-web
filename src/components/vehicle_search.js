import React,{useState} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; 
import axios from 'axios';

export default function Search(props){
	const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);
    if(query!=''){
	    axios.get('vehicles/search',{q: query })
	      .then((resp) => {

	      	const options = resp.data.map((item) => ({
	          reg_number: item.reg_number,
	          vehicle_id: item.id,
	          owner_name: item.owner.name,
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
      onSearch={handleSearch}
      options={options}
      placeholder="Search Vehicles"
      renderMenuItemChildren={(option, props) => (
        <div>
          <span>{option.reg_number} - {option.owner_name}</span>
        </div>
      )}
    />
  );
}




