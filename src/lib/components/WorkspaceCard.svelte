<script lang="ts">

  let {
    workspace
  } = $props<{
    workspace: any;
  }>();

</script>

<div class="card">

  {#if workspace.image}

    <div class="card-image">

      <figure class="image is-4by3">

        <img
          src={workspace.image}
          alt={workspace.name}
          style="object-fit: cover;"
        >

      </figure>

    </div>

  {:else}

    <div
      class="
        has-text-centered
        p-6
        has-background-light
      "
    >
      No image
    </div>

  {/if}

  <div class="card-content">

    <h2 class="title is-4 mb-2">

      {workspace.name}

    </h2>

    <p class="subtitle is-6 mb-4">

      {workspace.locationName}

    </p>

    <p class="mb-4">

      {workspace.description || "No description available."}

    </p>

    <div class="tags mb-4">

      <span class="tag is-success is-light">

        Lat: {workspace.latitude}

      </span>

      <span class="tag is-success is-light">

        Lng: {workspace.longitude}

      </span>

    </div>

  </div>

  <footer class="card-footer">

    <a
      href={`/workspace/${workspace._id}/edit`}
      class="card-footer-item"
    >
      Edit
    </a>

    <a
      class="card-footer-item has-text-danger"
    >
      Delete
    </a>

  </footer>

</div>