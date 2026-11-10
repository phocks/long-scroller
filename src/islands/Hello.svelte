<script lang="ts">
  let { name = "World" } = $props();

  $effect(() => {
    console.log("Hello", `${name}!`);
  });
</script>

<div>Hello {name}!</div>
