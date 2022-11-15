import dayjs from 'dayjs'
import dayjsUtc from 'dayjs/plugin/utc'
dayjs.extend(dayjsUtc)
import type { NextApiRequest, NextApiResponse } from 'next'
import { Gig } from '../../store/appState'

/**
 * Fetch a list of gigs from the gig finder api
 * @param _locationFilter a location filter if available, e.g. a city or district
 * @param _industryFilters industry filters if available, e.g. ["Retail", "Hospitality"]
 * @returns {Promise<Gig[]>} a list of gigs
 */
export async function fetchGigs(
  apiUrl: string,
  locationFilter?: string,
  industryFilters?: string[]
): Promise<Gig[]> {
  const res = await fetch(`${apiUrl}/gigs/unclaimed`, {
    mode: 'cors',
  })

  if (res.status === 404) {
    return []
  }

  if (res.status !== 200) {
    throw new Error('Request failed')
  }

  return await res.json()
}

export async function fetchMyGigs(
  apiUrl: string,
  emailAddress: string
): Promise<Gig[]> {
  console.log( "Inside fectch my gig email is " + emailAddress)
  const res = await fetch(`${apiUrl}/gigs/my-gigs/${emailAddress}`, {
    mode: 'cors',
  })

  if (res.status === 404) {
    return []
  }

  if (res.status !== 200) {
    throw new Error('Request failed')
  }

  return await res.json()
}

export async function requestGig(
  apiUrl: string,
  id: number,
  emailAddress: string
): Promise<void> {
  const res = await fetch(`${apiUrl}/gigs/${id}/claim`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailAddress }),
  })

  if (res.status !== 200) {
    throw new Error('Request failed')
  }
}

export async function cancelGig(
  apiUrl: string,
  id: number,
  emailAddress: string
): Promise<void> {
  const res = await fetch(`${apiUrl}/gigs/${id}/cancel`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailAddress }),
  })

  if (res.status !== 200) {
    throw new Error('Request failed')
  }
}
