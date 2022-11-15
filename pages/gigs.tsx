import { union, without } from "lodash";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { apiUrl } from "../apiUrl";
import PopUpMenu, { PopUpMenuItem } from "../components/atoms/PopUpMenu";
import TagButton from "../components/atoms/TagButton";
import GigList from "../components/molecules/GigList";
import GigsFilter from "../components/molecules/GigsFilter";
import IconButton from "../components/quarks/IconButton";
import { UIStore } from "../store/appState";
import { gigService } from "../store/gig-service";
import classNames from './gigs.module.css'

const ALL_INDUSTRIES: PopUpMenuItem[] = [
  { title: "Hospitality", value: "hospitality" },
  { title: "Retail", value: "retail" },
  { title: "Deliveries", value: "deliveries" },
  { title: "Cleaning", value: "cleaning" },
  { title: "Home Improvement", value: "home-improvement" },
];

const INDUSTRY_TITLE_LOOKUP: { [key: string]: string } = Object.fromEntries(
  new Map(ALL_INDUSTRIES.map((item) => [item.value, item.title]))
);

function buildIndustryList(selectedIndustries: string[] | undefined) {
  if (!selectedIndustries || !selectedIndustries.length) {
    return ALL_INDUSTRIES;
  }

  return ALL_INDUSTRIES.filter(
    (i) => !selectedIndustries.includes(i.value || "")
  );
}

const Gigs: NextPage = (props:any) => {
  console.log(props)
  const [filterVisible, setFilterVisible] = useState(false)
  const selectedIndustries = UIStore.useState( s => s.selectedIndustries )
  const router = useRouter()

  const appState = UIStore.useState((s) => s);

  function setSelectedIndustries(items: any){
    UIStore.update( s =>{
      s.selectedIndustries = items
    })
  }

  // load my gigs
  useEffect( () => {
    if ( router.isReady ){
      UIStore.update( s => {s.emailAddress = router.query.email as string})
      // gigService.loadMyGigs( router.query.email as string ) // Used for Client-Side Rendering
      gigService.loadMyGigs_stateUpdate(props.myGigs) // Used for Server-Side Rendering
    }
  },[router.isReady]);

  // load available gigs
  useEffect( () => {
    gigService.loadAvailableGigs_stateUpdate(props.availableGigs) // Used for Server-Side Rendering
    // gigService.loadAvailableGigs(); // Used for Client-Side Rendering
  },[]);
  
  const availableIndustries = buildIndustryList(appState.selectedIndustries)
  const shouldShowFilterOptions =
    !appState.selectedIndustries || appState.selectedIndustries.length < 3;

  return (
    <>
      <GigList
        className={classNames.myGigsSection}
        title="My Gigs"
        loading={appState.loadingMyGigs}
        gigs={appState.myGigs}
        ownEmailAddress={appState.emailAddress}
        disabled={appState.failedLoadingMyGigs || !appState.emailAddress}
        onActionClicked={(gig) => gigService.unassignGig(gig, appState.emailAddress)}
      />
      <GigList
        className={classNames.availableGigsSection}
        title="Available Gigs"
        loading={appState.loadingAvailableGigs}
        gigs={appState.availableGigs}
        ownEmailAddress={appState.emailAddress}
        disabled={appState.failedLoadingMyGigs || !appState.emailAddress}
        onActionClicked={(gig) => gigService.assignGig(gig, appState.emailAddress)}
      >
        <GigsFilter/>
      </GigList>
    </>
  );
};
export default Gigs;


export async function getServerSideProps(context: NextPageContext) {
  const availableGigs = await gigService.loadAvailableGigs_get().then((res)=>{return res.data})
  const myGigs = await gigService.loadMyGigs_get( context.query.email as string ).then((res)=>{return res.data})
  return {
    props: { // will be passed to the page component as props
      availableGigs: JSON.parse(JSON.stringify(availableGigs)),
      myGigs: JSON.parse(JSON.stringify(myGigs))
    }
  }
}