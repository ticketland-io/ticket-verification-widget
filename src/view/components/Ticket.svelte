<script>
  import {onMount} from 'svelte'
  import {get} from 'svelte/store'
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
    const _qs = get(qs)
    const _account = await account.get()
    const _web3 = await web3.get()

    await verify(
      _web3,
      normalizeEventId(_qs.eventId),
      _qs.codeChallenge,
      ticket.ticket_metadata,
      _account.pubkey,
      _qs.targetOrigin
    )
  }
</script>

<div>
  {#if ipfsMetadata}
    <p>{ipfsMetadata.name} #{ticket.seat_name}</p>
    <button on:click={verifyTicket}>Select</button>
  {/if}
</div>
