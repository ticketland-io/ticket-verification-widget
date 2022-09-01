<script>
  import Ticket from './Ticket.svelte'
  import {state} from '../../data/store'
  import {fetchTickets} from '../../services/ticket'

  export let tickets = []

  state.subscribe(async newState => {
    const stateData = await newState

    if(stateData.web3) {
      const response = await fetchTickets(stateData.qs.eventId)
      tickets = response.result
      console.log('>>>>>>>>', tickets)
    }
  })

</script>

<main>
	{#each tickets as ticket}
    <Ticket ticket={ticket} />
  {/each}
</main>
