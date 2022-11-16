import React from "react";
import { UIStore } from "../../store/appState";
import { APIDropdown } from "../molecules/ApiDropdown";
import Nav from "../molecules/Nav";
import TextField from "../quarks/TextField";

const Header = () => {
  const emailAddress = UIStore.useState((s) => s.emailAddress);
  const searchLocation = UIStore.useState((s) => s.searchLocation);
  function setSearchLocation( ev: any ){
    console.log("Setting location:\t", ev.target.value );
    UIStore.update( s =>{
      s.searchLocation = ev.target.value as string
    })
  }
  return (
      <Nav emailAddress={emailAddress}>
        <TextField
            placeholder="Filter by location"
            value={searchLocation || ""}
            onChange={(e) => setSearchLocation(e)}
        />
        <APIDropdown />
      </Nav>
  );
};

export default Header;
