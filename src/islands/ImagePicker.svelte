<script lang="ts">
  let image = $state.raw<ImageBitmap | null>(null);
  let fileName = $state("No file selected.");

  const onChange = async (event: Event) => {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    fileName = file.name;
    image?.close();
    image = await createImageBitmap(file);
  };
</script>

<label
  class="flex h-9 w-full cursor-pointer items-center gap-3 border border-input px-3
    text-sm text-foreground focus-within:ring-2 focus-within:ring-ring"
>
  <span class="font-medium">Browse...</span>
  <span class="min-w-0 truncate text-muted-foreground">{fileName}</span>
  <input type="file" accept="image/*" onchange={onChange} class="sr-only" />
</label>

{#if image}
  <p class="mt-2 text-sm text-muted-foreground">
    {image.width} × {image.height}px
  </p>
{/if}
