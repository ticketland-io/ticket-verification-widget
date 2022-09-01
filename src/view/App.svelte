<script>
	import './styles.css'
  import Auth from "./components/Auth.svelte"
	import {state} from '../data/store'
	import {initConnection} from '../services/connection'

	state.update($state => {
		$state.connection = initConnection(process.env.CLUSTER_ENDPOINT)
		return $state
	})
</script>

<main>
	<Auth />
</main>
