<script>
  import {onMount} from 'svelte'
  import {fetchMetadata} from '../../web3/ipfs'
  
  let ticket
  let ipfsMetadata

  onMount(async () => {
    ipfsMetadata = await fetchMetadata(ticket.metadata_cid)
  })

  const verifyTicket = async () => {
    
  }
</script>

<div>
  <p>{ipfsMetadata.name} #{ticket.seat_name}</p>
  <button on:click={verifyTicket}>Select</button>
</div>
