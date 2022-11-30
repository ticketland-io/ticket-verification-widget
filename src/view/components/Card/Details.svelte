<script>
  import { web3, user, firebase, qs, account } from "../../../data/store";
  import { useState, useEffect } from "../../../data/hooks";
  import {get} from 'svelte/store'
  import {verify} from '../../../services/verify-ticket'
  import {normalizeEventId} from '../../../services/ticket'
  import "./styles.css";

  export let eventName
  export let seatName
  export let startDate
  export let ticketMetadata

  const verifyTicket = async () => {
    const _qs = get(qs)
    const _account = await account.get()
    const _web3 = await web3.get()

    await verify(
      _web3,
      normalizeEventId(_qs.eventId),
      _qs.codeChallenge,
      ticketMetadata,
      _account.pubkey,
      _qs.targetOrigin,
    )
  }
</script>

<div class='container cardEventInfoContainer'>
  <div class='container cardName'>
    <div class='container headerBody'>
    {eventName} 
    </div>
    <div class='container seatNum'>
      Seat Num:#{seatName}
    </div>
  </div>
  <div class='container'>
    <div class='container detailsDate'>
      <img height={'15px'} src='assets/calendarIcon.png' />
      <div class='infoText'>
       {startDate}
      </div>
    </div>
    <div class='container buttonContainer'>
      <button class='button priceButton' on:click={verifyTicket}>
        verify
      </button>
    </div>
  </div>
</div>
