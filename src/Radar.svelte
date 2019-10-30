<script>
	import { radar } from './store.js';
	import Sector from './Sector.svelte';
	import handleRadar from './handleRadar.js';
</script>
<svg viewBox="-115 -110 230 220" use:handleRadar>
  {#each $radar as sector, direction (sector.name)}
		<Sector {...sector} {direction} />
	{/each}
</svg>