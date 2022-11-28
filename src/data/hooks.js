import {writable, derived} from 'svelte/store';
import {afterUpdate, onDestroy} from 'svelte';

export function useState(initialState) {
    const state = writable(initialState);
  
    const update = (val) =>
      state.update((currentState) => (typeof val === 'function' ? val(currentState) : val));
  
    const readableState = derived(state, ($state) => $state);
  
    return [readableState, update];
  }


export function useEffect(cb, deps) {
	let cleanup;
	
	function apply() {
		if (cleanup) cleanup();
		cleanup = cb();
	}
	
	if (deps) {
		let values = [];
		afterUpdate(() => {
			const new_values = deps();
			if (new_values.some((value, i) => value !== values[i])) {
				apply();
				values = new_values;
			}
		});
	} else {
		// no deps = always run
		afterUpdate(apply);
	}
	
	onDestroy(() => {
		if (cleanup) cleanup();
	});
}
