<script lang="ts">
  import { picked } from "../stores/image.svelte";

  const onChange = (event: Event) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    if (picked.url) URL.revokeObjectURL(picked.url);
    picked.url = URL.createObjectURL(file);
  };
</script>

<label>
  Choose an image
  <input type="file" accept="image/*" onchange={onChange} />
</label>



<style>
  input {
    max-width: 250px;
  }
</style>
