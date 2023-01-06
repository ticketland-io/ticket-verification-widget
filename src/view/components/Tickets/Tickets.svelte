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

  web3.subscribe(async ($web3) => {
    if (await $web3) {
      const _qs = get(qs);

      const eventResponse = await fetchEvent(firebase, get(qs).eventId);
      event = eventResponse.result[0];

      nftMetadata = await fetchMetadata(_qs.eventId);

      const response = await fetchTickets(get(qs).eventId);
      tickets = response.result;
    }
  });
</script>

<main class="root">
  {#each tickets as ticket}
    <Card {ticket} {event} {nftMetadata} />
  {/each}
</main>
