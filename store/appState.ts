import { Store } from "pullstate";

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
export interface APIDropdown{
    apiSelection: "amethyst" | "ruby" | "diamond" | "pearl" | "sapphire" | "garnet"
}
export class AppState {
    emailAddress: string = ""
    searchLocation: string = ""
    selectedIndustries: string[] = []

    loadingMyGigs: boolean = false
    failedLoadingMyGigs: boolean = false
    loadingAvailableGigs: boolean = false
    failedLoadingAvailableGigs: boolean = false
   
    updatingGig: boolean =  false;
    failedToUpdateGig: boolean = false;
    myGigs: Gig[] = []
    availableGigs: Gig[] = []
    apiDropdown: APIDropdown["apiSelection"] = "amethyst"
}



export const UIStore = new Store<AppState>( JSON.parse( JSON.stringify(new AppState())) );