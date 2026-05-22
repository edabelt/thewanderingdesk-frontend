<script lang="ts">

  import CollectionCard
    from "./CollectionCard.svelte";

  let {
    collections = []
  } = $props<{
    collections?: any[];
  }>();

</script>

{#each collections as collection}

  <CollectionCard
    {collection}
  />

{/each}