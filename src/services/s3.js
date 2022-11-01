import fetch from './api'

export const createS3Url = (eventId, file) => `${process.env.S3_URL}/${eventId}-${file}`

export const fetchMetadata = async (eventId) => {
  return JSON.parse(
    await fetch(
      createS3Url(eventId, 'event_metadata.json'),
      'GET'
    )
  )
}

// TODO: read the file type from the Event object instead of using the hardcoded jpeg
export const fetchEventImage = async eventId => {
  return await fetch(
    createS3Url(eventId, 'ticket_image.jpeg'),
    'GET'
  )
}
