<script>
  import {onMount} from "svelte";
  import {initConnection} from "../services/connection";
  import {connection, originJWT} from "../data/store";
  import Login from "./components/Login/Login.svelte";
  import Tickets from "./components/Tickets/Tickets.svelte";
  import "./styles.css";

  window.addEventListener("message", (event) => {
    if (event.origin === process.env.MAIN_DAPP_ORIGIN) {
      originJWT.set(event.data);
    }
  });

  onMount(async () => {
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
