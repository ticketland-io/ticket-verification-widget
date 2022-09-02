<script>
	import './styles.css'
	import {onMount} from 'svelte'
  import Auth from "./components/Auth.svelte"
	import Tickets from './components/Tickets.svelte'
	import {initConnection} from '../services/connection'
	import {connection} from '../data/store'

	onMount(async () => {
		connection.update($connection => {
			$connection = initConnection(process.env.CLUSTER_ENDPOINT)
			return $connection
		})
	})
</script>

<main>
	<Auth />
	<Tickets />
</main>
