<script>
  import {get} from "svelte/store";
  import {wallet, qs, firebase} from "../../../data/store";
  import {fetchTickets} from "../../../services/ticket";
  import Card from "../Card/Card.svelte";
  import {fetchEvent, fetchMetadata} from "../../../services/s3";
  import "./styles.css";

  export let tickets = [];
  export let event = {};
  export let nftMetadata = {};
  const eventId = get(qs).eventId;

  wallet.subscribe(async ($wallet) => {
    if (await $wallet && eventId) {

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
