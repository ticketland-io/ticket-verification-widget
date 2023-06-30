import fetch, {createBearerHeader} from './api'

export const createS3Url = (eventId, file) => `${process.env.S3_URL}/${eventId}-${file}`

export const fetchEvent = async (firebase, eventId) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events/${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const getTicketNftImagePath = (eventId, nftRefName) => (
  `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-nft_file_${nftRefName}`
)
