<script>
  import {format} from "date-fns";
  import {getTicketNftImagePath} from "../../../services/s3";
  import Details from "./Details.svelte";
  import "./styles.css";

  export let event;
  export let ticket;
          console.log(`🚀 ~ ticket:`, ticket);
</script>
  {#if event && ticket}
<div class="shadow">
  <div class="container carouselEventContainerFront">
    <div class="container">
      <img
        height="220px"
        width="100%"
        class="imageEvent"
        src={getTicketNftImagePath(
          event?.event_id,
          ticket?.ticket_type?.ticket_type_nft_details[0]?.ref_name
        )}
        alt="eventImage"
      />
    </div>
    <Details
      eventName={event?.name}
      startDate={format(event?.start_date || 0, "dd.MM.yy")}
      endDate={format(event?.end_date || 0, "dd.MM.yy")}
      seatName={ticket?.seat_name}
      cntSuiAddress={ticket?.cnt_sui_address}
      attended={ticket?.attended}
    />
  </div>
</div>
  {/if}
