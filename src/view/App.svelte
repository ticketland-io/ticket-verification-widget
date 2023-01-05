<script>
  import {onMount} from "svelte";
  import {initConnection} from "../services/connection";
  import {connection, originAccount} from "../data/store";
  import Login from "./components/Login/Login.svelte";
  import Tickets from "./components/Tickets/Tickets.svelte";
  import "./styles.css";

  window.addEventListener("message", event => {
    if (event.origin === process.env.TICKETLAND_DAPP) {
      originAccount.set(event.data);
    }
  });

  onMount(async () => {
    //Notify opener that window is open
    window.opener.postMessage(
      {status: 'opened', target: 'ticketland-dapp'},
      process.env.TICKETLAND_DAPP
    )

    connection.update($connection => {
      $connection = initConnection(process.env.CLUSTER_ENDPOINT);
      return $connection;
    });
  });
</script>

<main>
  <Login />
  <Tickets />
</main>
