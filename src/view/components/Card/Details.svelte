<script>
  import {get} from "svelte/store";
  import {web3, qs, account} from "../../../data/store";
  import {verify} from "../../../services/verify-ticket";
  import {normalizeEventId} from "../../../services/ticket";
  import "./styles.css";

  export let eventName;
  export let seatName;
  export let startDate;
  export let endDate;
  export let ticketMetadata;
  export let ticketNft;

  let buttonText = "Verify";
  let buttonDisabled = false;

  const verifyTicket = async () => {
    buttonDisabled = true;
    buttonText = "Verifying...";
    try {
      const _qs = get(qs);
      const _account = await account.get();
      const _web3 = await web3.get();

      await verify(
        _web3,
        normalizeEventId(_qs.eventId),
        _qs.codeChallenge,
        ticketMetadata,
        ticketNft,
        _account.pubkey,
        _qs.targetOrigin
      );
      buttonText = "Verified";
    } catch (error) {
      buttonDisabled = false;
      buttonText = "Verify";
      console.error("Failed to verify ticket: ", error);
    }
  };
</script>

<div class="container cardEventInfoContainer">
  <div class="container cardName">
    <div class="container headerBody">
      {eventName}
    </div>
    <div class="container seatNum">
      Seat Num: #{seatName}
    </div>
  </div>
  <div class="container">
    <div class="container detailsDate">
      <img height={"15px"} src="assets/calendarIcon.png" alt="calendarIcon" />
      <div class="infoText">
        {startDate}-{endDate}
      </div>
    </div>
    <div class="container buttonContainer">
      <button
        class="button priceButton"
        on:click={verifyTicket}
        disabled={buttonDisabled}
      >
        {buttonText}
      </button>
    </div>
  </div>
</div>
