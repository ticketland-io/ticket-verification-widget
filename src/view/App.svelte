<script>
	import {onMount} from 'svelte'
	import {initConnection} from '../services/connection'
	import {connection} from '../data/store'
	import Login from "./components/Login/Login.svelte"
	import Tickets from './components/Tickets/Tickets.svelte'
	import './styles.css'

	onMount(async () => {
		connection.update($connection => {
			$connection = initConnection(process.env.CLUSTER_ENDPOINT)
			return $connection
		})
	})
</script>

<main>
	<Login/>
	<Tickets/>
</main>
