<script>
  import {get} from "svelte/store";
  import {web3, qs, firebase} from "../../../data/store";
  import {fetchTickets} from "../../../services/ticket";
  import Card from "../Card/Card.svelte";
  import {fetchEvent, fetchMetadata} from "../../../services/s3";
  import "./styles.css";

  export let tickets = [];
  export let event = {};
  export let nftMetadata = {};
  const eventId = get(qs).eventId;
  console.log(`🚀 ~ eventId:`, eventId);

  web3.subscribe(async ($web3) => {
    if (await $web3 && eventId) {

      const eventResponse = await fetchEvent(firebase, eventId);
      event = eventResponse.result[0];

      nftMetadata = await fetchMetadata(eventId);

      const response = await fetchTickets(eventId);
      tickets = response.result;
    }
  });
</script>

<main class="root">
  {#if eventId}
    {#each tickets as ticket}
      <Card {ticket} {event} {nftMetadata} />
    {/each}
  {:else}
    <p class='emptyMessage'>
      Nothing to show
    </p>
  {/if}
</main>
