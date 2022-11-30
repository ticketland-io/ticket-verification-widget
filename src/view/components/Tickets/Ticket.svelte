<script>
  import {onMount} from 'svelte'
  import {get} from 'svelte/store'
  import {fetchMetadata} from '../../../services/s3'
  import {verify} from '../../../services/verify-ticket'
  import {normalizeEventId} from '../../../services/ticket'
  import {web3, qs, account} from '../../../data/store'
  
  export let ticket
  let nftMetadata

  onMount(async () => {
    const _qs = get(qs)
    nftMetadata = await fetchMetadata(_qs.eventId)
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
      _qs.targetOrigin,
    )
  }
</script>

<div>
  {#if nftMetadata}
    <p>{nftMetadata.name} #{ticket.seat_name}</p>
    <button on:click={verifyTicket}>Select</button>
  {/if}
</div>
