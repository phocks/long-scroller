<script lang="ts">
  import { picked } from "../stores/image.svelte";
</script>

{#if picked.url}
  <img src={picked.url} alt="Selected" />
{:else}
  <p>Choose an image from the sidebar.</p>
{/if}
