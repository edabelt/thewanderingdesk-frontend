<script lang="ts">

  let {
    workspace
  } = $props<{
    workspace: any;
  }>();

  let galleryImages =
    $derived(
      workspace.images && workspace.images.length > 0
        ? workspace.images
        : workspace.image
          ? [workspace.image]
          : []
    );

  let mainImage =
    $derived(
      galleryImages.length > 0
        ? galleryImages[0]
        : ""
    );

</script>

<div class="card">

  {#if mainImage}

    <div class="card-image">

      <figure class="image is-4by3">

        <img
          src={mainImage}
          alt={workspace.name}
          style="object-fit: cover;"
        >

      </figure>

    </div>

    {#if galleryImages.length > 1}

      <div class="p-3">

        <p class="is-size-7 has-text-grey mb-2">
          Gallery ({galleryImages.length} images)
        </p>

        <div class="columns is-mobile is-multiline is-variable is-1">

          {#each galleryImages as image}

            <div class="column is-one-quarter">

              <figure class="image is-square">

                <img
                  src={image}
                  alt={workspace.name}
                  style="
                    object-fit: cover;
                    border-radius: 6px;
                  "
                >

              </figure>

            </div>

          {/each}

        </div>

      </div>

    {/if}

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

    {#if workspace.weather}

      <div class="notification is-info is-light p-3">

        <p class="is-size-7">
          <strong>Weather:</strong>
          {workspace.weather.description}
        </p>

        <p class="is-size-7">
          <strong>Temperature:</strong>
          {workspace.weather.temp} °C
        </p>

      </div>

    {/if}

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