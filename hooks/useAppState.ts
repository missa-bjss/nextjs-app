import { useCallback, useEffect, useState } from "react";
import {
  cancelGig,
  fetchGigs,
  fetchMyGigs,
  requestGig,
} from "../pages/api/gigs";
import axios from "axios";
import { NextPageContext } from "next";
import LoginPanel from "../components - copy/LoginPanel";
import { useRouter } from "next/router";

export interface Gig {
  name: string;
  companyName: string;
  priceLevel: "Small" | "Medium" | "Large";
  latitude: number;
  longitude: number;
  status: string;
  industry: string;
  thumbnailImageUrl?: string;
  claimedUserMail?: string;
  address: string;
  startTimestamp: string;
  endTimestamp: string;
  id: number;
}

export interface AppState {
  emailAddress?: string;
  setEmailAddress: (address: string | undefined) => void;
  searchLocation?: string;
  setSearchLocation: (searchLocation: string | undefined) => void;
  selectedIndustries?: string[];
  setSelectedIndustries: (industries: string[] | undefined) => void;
  loadingGigs?: boolean;
  loadedGigs?: boolean;
  failedToLoadGigs?: boolean;
  gigUpdating?: boolean;
  gigUpdated?: boolean;
  failedToUpdateGig?: boolean;
  myGigs?: Gig[];
  availableGigs?: Gig[];
  requestGig: (gig?: Gig) => Promise<void>;
  cancelGig: (gig?: Gig) => Promise<void>;
  redirect?: boolean
}
let defaultAppState: Partial<AppState>;

if (typeof window !== "undefined") {
  defaultAppState = {
    emailAddress:
      new URLSearchParams(window.location.search).get("email") || undefined,
  };
}

export default function useAppState(apiUrl: string): AppState {
  const [emailAddress, setEmailAddress] = useState<string | undefined>(
    defaultAppState?.emailAddress
  );
  const [searchLocation, setSearchLocation] = useState<string | undefined>();
  const [selectedIndustries, setSelectedIndustries] = useState<
    string[] | undefined
  >();
  const [loadingGigs, setLoadingGigs] = useState(true);
  const [loadedGigs, setLoadedGigs] = useState(false);
  const [failedToLoadGigs, setFailedToLoadGigs] = useState(false);
  const [myGigs, setMyGigs] = useState<Gig[] | undefined>();
  const [availableGigs, setAvailableGigs] = useState<Gig[] | undefined>();
  const [gigUpdating, setGigUpdating] = useState(false);
  const [gigUpdated, setGigUpdated] = useState(false);
  const [failedToUpdateGig, setFailedToUpdateGig] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // useEffect(() => {
  //   if(typeof window !== "undefined"){
  //     if (emailAddress) {
  //       window.history.replaceState(
  //         undefined,
  //         'Gig Finder',
  //         `/?${new URLSearchParams({ email: emailAddress }).toString()}`
  //       )
  //     } else {
  //       window.history.replaceState(undefined, 'Gig Finder', '/')
  //     }
  //   }
  // }, [emailAddress])

  const loadGigs = useCallback(() => {
    (async () => {
      setLoadingGigs(true);
      setFailedToLoadGigs(false);

      try {
        // const data = await fetchGigs(apiUrl, searchLocation, selectedIndustries)
        const data = await axios
          .get("/api/fetch-gigs")
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(data);
        setAvailableGigs(data);
        const myData = await axios
          .get("/api/my-gigs/" + emailAddress)
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
        // const myData = await fetchMyGigs(apiUrl, emailAddress || '')
        setMyGigs(myData);
        setLoadingGigs(false);
        setLoadedGigs(true);
      } catch (err) {
        setLoadingGigs(false);
        setFailedToLoadGigs(true);
      }
    })();
  }, [searchLocation, selectedIndustries, emailAddress]);
  useEffect(() => {
    if (!emailAddress) {
      console.log("no emailAddress")
      setRedirect(true);
      return;
      // return Login(emailAddress, setEmailAddress)
    }
    else{
      setRedirect(false);
    }
    loadGigs();
    const nextInterval = setInterval(loadGigs, 10000);
    return () => clearInterval(nextInterval);
  }, [emailAddress, searchLocation, loadGigs, redirect]);

  async function assignGig(gig?: Gig) {
    if (!gig) {
      return;
    }

    try {
      setGigUpdating(true);
      setGigUpdated(false);
      setFailedToUpdateGig(false);

      await requestGig(apiUrl, gig.id, emailAddress || "");

      setGigUpdating(false);
      setGigUpdated(true);

      loadGigs();
    } catch {
      setGigUpdating(false);
      setFailedToUpdateGig(true);
    }
  }

  async function unassignGig(gig?: Gig) {
    if (!gig) {
      return;
    }

    try {
      setGigUpdating(true);
      setGigUpdated(false);
      setFailedToUpdateGig(false);
      axios.post( "/api/cancel-gig", {"apiUrl":apiUrl, "gig_id": gig.id, "emailAddress": emailAddress} )
      // await cancelGig(apiUrl, gig.id, emailAddress || '')

      setGigUpdating(false);
      setGigUpdated(true);

      loadGigs();
    } catch {
      setGigUpdating(false);
      setFailedToUpdateGig(true);
    }
  }

  return {
    emailAddress,
    setEmailAddress,
    searchLocation,
    setSearchLocation,
    selectedIndustries,
    setSelectedIndustries,
    myGigs,
    availableGigs,
    loadingGigs,
    loadedGigs,
    failedToLoadGigs,
    gigUpdating,
    gigUpdated,
    failedToUpdateGig,
    requestGig: assignGig,
    cancelGig: unassignGig,
    redirect
  };
}
