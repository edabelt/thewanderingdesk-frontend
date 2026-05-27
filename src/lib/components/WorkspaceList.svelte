<script lang="ts">

  let {
    workspaces = []
  } = $props();

  let selectedImage =
    $state("");

  let showModal =
    $state(false);

  let modalImages =
    $state<string[]>([]);

  let selectedIndex =
    $state(0);

  function openImage(
    images: string[],
    index: number
  ) {

    modalImages =
      images;

    selectedIndex =
      index;

    selectedImage =
      images[index];

    showModal =
      true;

  }

  function closeModal() {

    selectedImage =
      "";

    modalImages =
      [];

    selectedIndex =
      0;

    showModal =
      false;

  }

  function nextImage() {

    selectedIndex =
      (selectedIndex + 1) % modalImages.length;

    selectedImage =
      modalImages[selectedIndex];

  }

  function previousImage() {

    selectedIndex =
      selectedIndex === 0
        ? modalImages.length - 1
        : selectedIndex - 1;

    selectedImage =
      modalImages[selectedIndex];

  }

  async function deleteWorkspace(
    id: string
  ) {

    const response =
      await fetch(
        `https://thewanderingdesk-backend.onrender.com/api/placemarks/${id}`,
        {
          method: "DELETE"
        }
      );

    if (response.ok) {

      window.location.reload();

    } else {

      alert(
        "Unable to delete workspace"
      );

    }

  }

</script>

{#if workspaces.length}

  <div class="columns is-multiline">

    {#each workspaces as workspace}

      <div class="column is-half">

        <div class="card placemark-card">

          <div class="card-image">

            {#if workspace.images && workspace.images.length > 0}

              <figure class="image is-4by3">

                <img
                  src={workspace.images[0]}
                  alt={workspace.name}
                  style="
                    object-fit: cover;
                    cursor: pointer;
                  "
                  onclick={() =>
                    openImage(
                      workspace.images,
                      0
                    )
                  }
                >

              </figure>

              {#if workspace.images.length > 1}

                <div class="p-2">

                  <p class="is-size-7 has-text-grey mb-2">
                    Gallery ({workspace.images.length} images)
                  </p>

                  <div
                    class="
                      columns
                      is-mobile
                      is-multiline
                      is-variable
                      is-1
                    "
                  >

                    {#each workspace.images as image, index}

                      <div class="column is-one-quarter">

                        <figure class="image is-square">

                          <img
                            src={image}
                            alt={workspace.name}
                            style="
                              object-fit: cover;
                              border-radius: 6px;
                              cursor: pointer;
                            "
                            onclick={() =>
                              openImage(
                                workspace.images,
                                index
                              )
                            }
                          >

                        </figure>

                      </div>

                    {/each}

                  </div>

                </div>

              {/if}

            {:else if workspace.image}

              <figure class="image is-4by3">

                <img
                  src={workspace.image}
                  alt={workspace.name}
                  style="
                    object-fit: cover;
                    cursor: pointer;
                  "
                  onclick={() =>
                    openImage(
                      [workspace.image],
                      0
                    )
                  }
                >

              </figure>

            {:else}

              <figure
                class="
                  image
                  is-4by3
                  has-background-light
                  is-flex
                  is-align-items-center
                  is-justify-content-center
                "
              >

                <span>
                  No image
                </span>

              </figure>

            {/if}

          </div>

          <div class="card-content">

            <div
              class="
                columns
                is-mobile
                is-vcentered
                mb-3
              "
            >

              <div class="column is-three-quarters">

                <div>

                  <p
                    class="
                      is-size-4
                      has-text-weight-bold
                      mb-1
                    "
                    style="
                      line-height: 1.2;
                      word-break: break-word;
                    "
                  >
                    {workspace.name}
                  </p>

                  <p
                    class="
                      is-size-6
                      has-text-grey
                      mb-0
                    "
                    style="
                      line-height: 1.2;
                      word-break: break-word;
                    "
                  >
                    {workspace.locationName}
                  </p>

                </div>

              </div>

              {#if workspace.weather}

                <div
                  class="
                    column
                    is-one-quarter
                    has-text-centered
                  "
                >

                  {#if workspace.weather.icon}

                    <figure
                      class="
                        image
                        is-48x48
                        is-inline-block
                        mb-1
                      "
                    >

                      <img
                        src={`https://openweathermap.org/img/wn/${workspace.weather.icon}@2x.png`}
                        alt={workspace.weather.description}
                      >

                    </figure>

                  {/if}

                  <p
                    class="
                      is-size-7
                      has-text-weight-semibold
                    "
                  >
                    {workspace.weather.temp} °C
                  </p>

                </div>

              {/if}

            </div>

            <div class="content">

              {#if workspace.description}

                <p>
                  {workspace.description}
                </p>

              {:else}

                <p>
                  No description available.
                </p>

              {/if}

              <div class="tags mt-3">

                <span
                  class="
                    tag
                    is-success
                    is-light
                  "
                >
                  Lat: {workspace.latitude}
                </span>

                <span
                  class="
                    tag
                    is-success
                    is-light
                  "
                >
                  Lng: {workspace.longitude}
                </span>

              </div>

              {#if workspace.weather}

                <div
                  class="
                    notification
                    is-light
                    py-2
                    px-3
                    mt-3
                    mb-0
                  "
                >

                  <strong>
                    Weather:
                  </strong>

                  {workspace.weather.description}

                  <br>

                  <strong>
                    Temperature:
                  </strong>

                  {workspace.weather.temp} °C

                </div>

              {/if}

            </div>

          </div>

          <footer class="card-footer">

            <a
              href={`/workspace/${workspace._id}/edit`}
              class="card-footer-item"
            >
              Edit
            </a>

            <button
              class="
                card-footer-item
                button
                is-white
              "
              onclick={() =>
                deleteWorkspace(
                  workspace._id
                )
              }
            >
              Delete
            </button>

          </footer>

        </div>

      </div>

    {/each}

  </div>

{:else}

  <div
    class="
      notification
      is-light
      has-text-centered
    "
  >

    No workspaces added yet.

  </div>

{/if}

{#if showModal}

  <div class="modal is-active">

    <div
      class="modal-background"
      onclick={closeModal}
    ></div>

    {#if modalImages.length > 1}

      <button
        class="button is-light"
        style="
          position: fixed;
          top: 50%;
          left: 3rem;
          transform: translateY(-50%);
          z-index: 9999;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          font-size: 2rem;
        "
        onclick={previousImage}
      >
        ‹
      </button>

      <button
        class="button is-light"
        style="
          position: fixed;
          top: 50%;
          right: 3rem;
          transform: translateY(-50%);
          z-index: 9999;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          font-size: 2rem;
        "
        onclick={nextImage}
      >
        ›
      </button>

    {/if}

    <div class="modal-content">

      <figure class="image">

        <img
          src={selectedImage}
          alt="Full View"
          style="
            max-height: 90vh;
            object-fit: contain;
            border-radius: 12px;
          "
        >

      </figure>

    </div>

    <button
      class="modal-close is-large"
      aria-label="close"
      onclick={closeModal}
    ></button>

  </div>

{/if}