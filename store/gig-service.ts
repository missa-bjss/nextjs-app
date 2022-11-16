import axios from 'axios';
import { apiUrl } from '../apiUrl';
import { Gig, UIStore } from './appState';

class GigService {
    /**
     * Loads gigs for a user
     * @param email 
     */
     loadMyGigs_get( email: string, appState:any ){
        return axios.get(`${apiUrl}/gigs/my-gigs/${email}`, {
          headers: {
            'bjss-db': appState.apiDropdown
          }
        })
    }
    loadAvailableGigs_get(appState:any){
      return axios.get(`${apiUrl}/gigs/unclaimed`, {
        headers: {
          'bjss-db': appState.apiDropdown
        }
      })
    }
    loadMyGigs( email: string, appState:any ){
        this.setLoadingMyGigs( true )
        this.setFailedLoadingMyGig( false)
      
        this.loadMyGigs_get(email, appState).then((res) => {
          UIStore.update( s => {
              s.myGigs = res.data;
          })
          this.setFailedLoadingMyGig( false)
        })
        .catch((err) => {
          console.log(err);
          this.setFailedLoadingMyGig(true)
        })
        .finally( () =>{
          this.setLoadingMyGigs(false)
        })
    }
    setLoadingMyGigs( status: boolean ){
      UIStore.update( s => { s.loadingMyGigs = status })
    }
    setFailedLoadingMyGig( status: boolean ){
      UIStore.update( s => { s.failedLoadingMyGigs = status })
    }

    /**
     * Loads all unclaimed gigs
     */
    loadAvailableGigs(appState:any){
      this.setLoadingAvailableGigs(true);
      this.setFailedLoadingAvailableGigs(false)

      this.loadAvailableGigs_get(appState).then((res) => {
        UIStore.update( s => {
            s.availableGigs = res.data;
        })
        this.setFailedLoadingAvailableGigs(false)
      })
      .catch((err) => {
        console.log(err);
        this.setFailedLoadingAvailableGigs(true)
      })
      .finally( () =>{
        this.setLoadingAvailableGigs(false)
      })
    }
    loadAvailableGigs_stateUpdate(availableGigsData:any){
      this.setLoadingAvailableGigs(true);
      this.setFailedLoadingAvailableGigs(false)

      try{
        UIStore.update( s => {
          s.availableGigs = availableGigsData
        })
        this.setFailedLoadingAvailableGigs(false)
      }
      catch(err: any) {
        console.log(err);
        this.setFailedLoadingAvailableGigs(true)
      }
        this.setLoadingAvailableGigs(false)
    }
    loadMyGigs_stateUpdate( myGigsData: any ){
      this.setLoadingMyGigs( true )
      this.setFailedLoadingMyGig( false)
      try{
        UIStore.update( s => {
            s.myGigs = myGigsData;
        })
        this.setFailedLoadingMyGig( false)
      }
      catch(err) {
        console.log(err);
        this.setFailedLoadingMyGig(true)
      }
      this.setLoadingMyGigs(false)
  }
    setLoadingAvailableGigs(status: boolean){
      UIStore.update( s => { s.loadingAvailableGigs = status })
    }
    setFailedLoadingAvailableGigs(status: boolean){
      UIStore.update( s => { s.failedLoadingAvailableGigs = status })
    }

  /**
   * Assign gig to a user
   * @param gig the gig to be assigned
   * @param email user's email
   */
  assignGig(gig: Gig, email: string) {
    if (!gig || !email) return

    this.setUpdatingGig(true)
    axios.post( `${apiUrl}/gigs/${gig.id}/claim`, {
      emailAddress: email
    })
    .then( res =>{
      this.setFailedToUpdateGig(false)
      this.loadMyGigs( email);
      this.loadAvailableGigs();
    })
    .catch( (error)=>{
      this.setFailedToUpdateGig(true)
    })
    .finally( ()=>{
      this.setUpdatingGig(false)
    })
  }

  /**
   * Unassign a gig to a user
   * @param gig to be unassigned
   */
  unassignGig(gig: Gig, email: string) {
    if (!gig || !email) return

    this.setUpdatingGig(true);
    this.setFailedToUpdateGig(false);
    axios.post( `${apiUrl}/gigs/${gig.id}/cancel`, { emailAddress: email} )
    .then( res =>{
      this.setFailedToUpdateGig(false)
      this.loadMyGigs(email)
      this.loadAvailableGigs();
    })
    .catch( error=>{
      this.setFailedToUpdateGig(true)
    })
    .finally( ()=>{
      this.setUpdatingGig(false)
    })
  }

  setUpdatingGig(status: boolean){
    UIStore.update( s => { s.updatingGig = status } )
  }
  
  setFailedToUpdateGig(status: boolean){
    UIStore.update( s => { s.failedToUpdateGig = status } )
  }
}

export const gigService = new GigService();








