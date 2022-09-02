<script>
  import * as anchor from '@project-serum/anchor'
  import {onMount} from 'svelte'
  import {fetchMetadata} from '../../web3/ipfs'
  import {verify} from '../../services/verify-ticket'
  import {normalizeEventId} from '../../services/ticket'
  import {state} from '../../data/store'
  
  let ticket = {}
  let ipfsMetadata = {}

  onMount(async () => {
    ipfsMetadata = await fetchMetadata(ticket?.metadata_cid)
  })

  const verifyTicket = async () => {
    await verify(
      state.web3,
      normalizeEventId(eventId),
      state.qs.codeChallenge,
      new anchor.web3.PublicKey(ticket.ticket_metadata)
    )
  }
</script>

<div>
  <p>{ipfsMetadata?.name} #{ticket?.seat_name}</p>
  <button on:click={verifyTicket}>Select</button>
</div>
