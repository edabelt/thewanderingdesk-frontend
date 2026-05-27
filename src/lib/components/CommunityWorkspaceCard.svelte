<script lang="ts">

  let {
    workspace,
    onRate
  } = $props<{
    workspace: any;
    onRate?: (
      workspaceId: string,
      score: number
    ) => void;
  }>();

  let selectedRating =
    $state(0);

  let showImageModal =
    $state(false);

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

  function submitRating(score: number) {

    selectedRating =
      score;

    if (onRate) {

      onRate(
        workspace._id,
        score
      );

    }

  }

  function openImageModal() {

    showImageModal =
      true;

  }

  function closeImageModal() {

    showImageModal =
      false;

  }

</script>

<div class="card community-card">

  {#if mainImage}

    <div class="card-image">

      <figure class="image is-4by3">

        <img
          src={mainImage}
          alt={workspace.name}
          class="workspace-image"
          onclick={openImageModal}
        >

      </figure>

    </div>

  {:else}

    <div class="has-text-centered p-6 has-background-light">
      No image
    </div>

  {/if}

  <div class="card-content">

    <div class="card-header-row">

      <div class="workspace-title-block">

        <h2 class="title is-4 mb-2 workspace-title">
          {workspace.name}
        </h2>

        <p class="subtitle is-6 has-text-grey workspace-location">
          {workspace.locationName}
        </p>

      </div>

      <span class="tag is-success is-light">
        Public
      </span>

    </div>

    <p class="workspace-description">
      {workspace.description || "No description available."}
    </p>

    <div class="mb-4">

      {#if workspace.averageRating}

        <div class="is-flex is-align-items-center">

          <span class="tag is-warning mr-2">
            ★ {workspace.averageRating}
          </span>

          <span class="is-size-7 has-text-grey">
            ({workspace.totalRatings} ratings)
          </span>

        </div>

      {:else}

        <span class="tag is-light">
          No ratings yet
        </span>

      {/if}

    </div>

    {#if galleryImages.length > 1}

      <div class="mb-4">

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
                  class="gallery-thumb"
                >

              </figure>

            </div>

          {/each}

        </div>

      </div>

    {/if}

    <div class="tags mb-4">

      <span class="tag is-info is-light">
        Lat: {workspace.latitude}
      </span>

      <span class="tag is-info is-light">
        Lng: {workspace.longitude}
      </span>

    </div>

    <div class="rating-box">

      <p class="has-text-weight-semibold mb-3">
        Rate this workspace
      </p>

      <div class="buttons are-small">

        {#each [1, 2, 3, 4, 5] as score}

          <button
            class="button"
            class:is-warning={selectedRating === score}
            onclick={() =>
              submitRating(score)
            }
          >
            {score} ★
          </button>

        {/each}

      </div>

    </div>

  </div>

</div>

{#if showImageModal}

  <div class="modal is-active">

    <div
      class="modal-background"
      onclick={closeImageModal}
    ></div>

    <div class="modal-content">

      <figure class="image">

        <img
          src={mainImage}
          alt={workspace.name}
          class="modal-image"
        >

      </figure>

    </div>

    <button
      class="modal-close is-large"
      aria-label="close"
      onclick={closeImageModal}
    ></button>

  </div>

{/if}

<style>

  .community-card {
    height: 100%;
    overflow: hidden;
  }

  .workspace-image {
    object-fit: cover;
    cursor: pointer;
  }

  .card-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .workspace-title-block {
    min-width: 0;
  }

  .workspace-title {
    line-height: 1.2;
    word-break: break-word;
  }

  .workspace-location {
    line-height: 1.2;
    margin-bottom: 0;
    word-break: break-word;
  }

  .workspace-description {
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .gallery-thumb {
    object-fit: cover;
    border-radius: 6px;
  }

  .rating-box {
    background: #f7f7f7;
    border-radius: 10px;
    padding: 1.25rem;
  }

  .modal-image {
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
  }

</style>