
import Dropdown, { ReactDropdownProps } from 'react-dropdown';
import 'react-dropdown/style.css';
import { UIStore } from '../../store/appState';

export const APIDropdown = () => {
  const options = [
    "amethyst", "ruby" , "diamond" , "pearl" , "sapphire", "garnet"
  ];
  const defaultOption = options[0];
  function updateApiDropdown(e: any){
    console.log(e);
    console.log(typeof e)
    UIStore.update( s =>{
      s.apiDropdown = e.value
    })
  }
  return (
    <Dropdown options={options} onChange={(e)=>updateApiDropdown(e)} value={defaultOption} placeholder="Select an option" />
  );
};
