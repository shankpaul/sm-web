import React,{useState} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead'; 
import axios from 'axios';

export default function OwnerSearch(props){
	const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleDBSearch = (query) => {
    setIsLoading(true);
    if(query!=''){
	    axios.get('owners/search/'+query)
	      .then((resp) => {

	      	const options = resp.data.map((item) => ({
	          owner_name: item.name,
	          phone: item.phone,
	          id: item.id
	        }));   
            console.log(options)     
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
      id="owner-search"
      isLoading={isLoading}
      labelKey="owner_name"
      minLength={0}
      onSearch={handleDBSearch}
      options={options}
      placeholder="Search Owners"
      renderMenuItemChildren={(option, props) => (
        <div>
          <span>{option.owner_name} - {option.phone}</span>
        </div>
      )}
    />
  );
}




