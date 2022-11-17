
import { useEffect } from 'react';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { dataTableUrl } from '../../apiUrl';
import { UIStore } from '../../store/appState';

export const APIDropdown = () => {
  let options_db:Option[] = [];
  let options_api:Option[] = [];
  const populateApiDropdown = async (dataTableUrl:string) =>{
    const response = await fetch(dataTableUrl, {headers:{"Accept":"application/json"}, mode: 'cors'})
    return response.json()
  }
  useEffect(() => {
    populateApiDropdown(dataTableUrl).then((res)=>{
      // res.value[0].RowKey.forEach((rowKey:any) => {
        // options.push({label:res.value[0].description, value:rowKey})
      // });
      options_db.push({label:res.value[1].description, value:res.value[1].RowKey})
      options_api.push({label:res.value[0].description, value:res.value[0].RowKey})
    });
  }, [])
  
  
  function updatedropdown_db(e: any){
      UIStore.update( s =>{
        s.dropdown_db = e.value
      })
  }
  function updatedropdown_api(e: any){
    UIStore.update( s =>{
      s.dropdown_api = e.value
    })
}
  return (
    <>
      <Dropdown options={options_db} onChange={(e)=>updatedropdown_db(e)} placeholder="Select a database" />
      <Dropdown options={options_api} onChange={(e)=>updatedropdown_api(e)} placeholder="Select an API" />
    </>
  );
};
