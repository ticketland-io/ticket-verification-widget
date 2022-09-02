<script>
  import {onMount} from 'svelte'
  import {fetchMetadata} from '../../web3/ipfs'
  import {verify} from '../../services/verify-ticket'
  import {normalizeEventId} from '../../services/ticket'
  import {web3, qs, account} from '../../data/store'
  
  export let ticket
  let ipfsMetadata

  onMount(async () => {
    ipfsMetadata = await fetchMetadata(ticket.metadata_cid)
  })

  const verifyTicket = async () => {
    await verify(
      await web3.get(),
      normalizeEventId(eventId),
      qs.codeChallenge,
      (await account()).publicKey,
    )
  }
</script>

<div>
  {#if ipfsMetadata}
    <p>{ipfsMetadata.name} #{ticket.seat_name}</p>
    <button on:click={verifyTicket}>Select</button>
  {/if}
</div>
