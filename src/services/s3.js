import fetch, {createBearerHeader} from './api'

export const createS3Url = (eventId, file) => `${process.env.S3_URL}/${eventId}-${file}`

export const fetchMetadata = async (eventId) => {
  return JSON.parse(
    await fetch(
      createS3Url(eventId, 'event_metadata.json'),
      'GET'
    )
  )
}

export const fetchEvent = async (firebase, eventId) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events/${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const get_event_ticket_image_path = (eventId, fileType) => {
  return `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-ticket_image.${fileType}`
}
