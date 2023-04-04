<script>
  import {format} from "date-fns";
  import {get_event_ticket_image_path} from "../../../services/s3";
  import Details from "./Details.svelte";
  import "./styles.css";

  export let event;
  export let ticket;
  export let nftMetadata;
</script>

<div class="shadow">
  <div class="container carouselEventContainerFront">
    <div class="container">
      <img
        height="220px"
        width="100%"
        class="imageEvent"
        src={get_event_ticket_image_path(
          event?.event_id,
          event?.start_date,
          event?.end_date,
          event?.ticket_images
        )}
        alt="eventImage"
      />
    </div>
    <Details
      eventName={nftMetadata?.name}
      startDate={format(event?.start_date || 0, "dd.MM.yy")}
      endDate={format(event?.end_date || 0, "dd.MM.yy")}
      seatName={ticket?.seat_name}
      ticketMetadata={ticket?.ticket_metadata}
      ticketNft={ticket?.ticket_nft}
      attended={ticket?.attended}
    />
  </div>
</div>
