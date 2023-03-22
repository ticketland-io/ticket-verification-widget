<script>
  import {onMount} from "svelte";
  import {initConnection} from "../services/connection";
  import {connection} from "../data/store";
  import Login from "./components/Login/Login.svelte";
  import Tickets from "./components/Tickets/Tickets.svelte";
  import "./styles.css";

  onMount(async () => {
    // Notify opener that window is open
    if (window.opener) {
      window.opener.postMessage(
        {status: "opened", target: "ticketland-auth"},
        "*"
      );
    }

    connection.update(($connection) => {
      $connection = initConnection(process.env.CLUSTER_ENDPOINT);
      return $connection;
    });
  });
</script>

<main>
  <div class="backgroundColor" />
  <div class="titleContainer">
    <h1 class="title">
      Ticketland Verification
    </h1>
    <p class="description">
      Verify your tickets for online events. Just click verify on your ticket and you're done!
    </p>
  </div>
  <Login />
  <Tickets />
</main>
