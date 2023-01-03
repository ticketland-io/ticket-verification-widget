<script>
  import {get} from 'svelte/store'
  import {web3, qs} from '../../../data/store'
  import {fetchTickets} from '../../../services/ticket'
  import Card from '../Card/Card.svelte';
  import './styles.css'

  export let tickets = []

  web3.subscribe(async $web3 => {
    if(await $web3) {
      const response = await fetchTickets(get(qs).eventId)
      tickets = response.result
    }
  })

</script>

<main class='root'>
	{#each tickets as ticket}
    <Card ticket={ticket}/>
  {/each}
</main>
