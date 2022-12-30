<script>
  import {get} from 'svelte/store';
  import {onMount} from 'svelte';
  import {format} from 'date-fns';
  import {qs, firebase} from '../../../data/store';
  import {fetchEvent, fetchMetadata, get_event_ticket_image_path} from '../../../services/s3';
  import Details from './Details.svelte';
  import './styles.css';

  export let ticket;
  let nftMetadata;
  let event

  const getEvent = async () => {
    const {result} = await fetchEvent(firebase, get(qs).eventId)
    event=result[0]
  }

  onMount(async () => {
    const _qs = get(qs);
    nftMetadata = await fetchMetadata(_qs.eventId);
    await getEvent()
  });
</script>

<div class='shadow'>
  <div class='container carouselEventContainerFront'>
    <div class='container'>
      <img
        height=220px
        width=100%
        class='imageEvent'
        src={get_event_ticket_image_path(event?.event_id, event?.file_type)}
        alt='eventImage'
      />
    </div>
    <Details
      eventName={nftMetadata?.name}
      startDate={format(event?.start_date || 0, 'dd.MM.yy')} 
      seatName={ticket?.seat_name} 
      ticketMetadata={ticket?.ticket_metadata}
    />
  </div>
</div>
