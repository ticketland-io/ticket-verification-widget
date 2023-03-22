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


export const get_event_ticket_image_path = (
  eventId,
  startDate,
  endDate,
  ticketImages = [],
) => {
  const now = Date.now()
  let ticketImageType = 0
  const sortedImages = ticketImages
    .map(ticketImage => ticketImage.ticket_image_type)
    .sort((a, b) => a - b)

  if (now >= startDate && now < endDate) {
    ticketImageType = sortedImages.find(type => type === 1) || 0
  } else if (now >= endDate) {
    ticketImageType = sortedImages.find(type => type === 2) || sortedImages.find(type => type === 1) || 0
  }

  return `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-ticket_image_${ticketImageType}`
}
