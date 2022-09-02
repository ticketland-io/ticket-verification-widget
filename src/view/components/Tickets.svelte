<script>
  import {get} from 'svelte/store'
  import Ticket from './Ticket.svelte'
  import {web3, qs} from '../../data/store'
  import {fetchTickets} from '../../services/ticket'

  export let tickets = []

  web3.subscribe(async $web3 => {
    if(await $web3) {
      const response = await fetchTickets(get(qs).eventId)
      tickets = response.result
    }
  })

</script>

<main>
	{#each tickets as ticket}
    <Ticket ticket={ticket} />
  {/each}
</main>
