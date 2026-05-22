<script lang="ts">

  let {
  errors = []
} = $props<{
  errors?: any[];
}>();
</script>

{#if errors.length}

  <div class="notification is-danger">

    <button class="delete"></button>

    <strong>
      There was a problem with your submission:
    </strong>

    <ul>

      {#each errors as error}

        <li>
          {error.message}
        </li>

      {/each}

    </ul>

  </div>

{/if}