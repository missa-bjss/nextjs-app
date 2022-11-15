import classNames from "./LoginPanel.module.css";
import TextField from "../quarks/TextField";
import { ChangeEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UIStore } from "../../store/appState";


export const LoginPanel = () => {
  const emailAddress = UIStore.useState((state) => state.emailAddress);
  const router = useRouter()
  

  function setEmailAddress( ev: any ){
    console.log("Setting email address:\t", ev.target.value );
    UIStore.update( s =>{
      s.emailAddress = ev.target.value as string
    })
  }

  function navigateToGigs( ev: any ){
    if ( ev.key == "Enter" ){
      router.push( "/gigs?email=" + encodeURIComponent(emailAddress));
    }
  }

  return (
    <>
    <section>
      <fieldset className={classNames.group}>
        <label htmlFor="email">Please enter your email address</label>
        <TextField
          id="email"
          name="email"
          type="email"
          value={emailAddress}
          onChange={(ev) => setEmailAddress(ev)}
          onKeyUp={ (ev:any) => navigateToGigs(ev) }
        />
      </fieldset>
    </section>
    </>
  );
};
