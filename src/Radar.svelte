<script>
	import { radar } from './store';
	import Sector from './Sector.svelte';
	import handleRadar from './helpers/handleRadar';
</script>
<svg viewBox="-115 -110 230 220" use:handleRadar>
  {#each $radar as sector, direction (sector.name)}
		<Sector {...sector} {direction} />
	{/each}
</svg>