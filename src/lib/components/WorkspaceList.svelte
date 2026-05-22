<script lang="ts">

  let {
  workspaces = []
} = $props();
  async function deleteWorkspace(
    id: string
  ) {

    const response =
      await fetch(
        `http://localhost:3000/api/placemarks/${id}`,
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

            {#if workspace.image}

              <figure class="image is-4by3">

                <img
                  src={workspace.image}
                  alt={workspace.name}
                >

              </figure>

            {:else}

              <figure
                class="image is-4by3 has-background-light is-flex is-align-items-center is-justify-content-center"
              >

                <span>
                  No image
                </span>

              </figure>

            {/if}

          </div>

          <div class="card-content">

            <div
              class="columns is-mobile is-vcentered mb-3"
            >

              <div class="column is-three-quarters">

                <div>

                  <p
                    class="is-size-4 has-text-weight-bold mb-1"
                    style="line-height: 1.2; word-break: break-word;"
                  >
                    {workspace.name}
                  </p>

                  <p
                    class="is-size-6 has-text-grey mb-0"
                    style="line-height: 1.2; word-break: break-word;"
                  >
                    {workspace.locationName}
                  </p>

                </div>

              </div>

              {#if workspace.weather}

                <div
                  class="column is-one-quarter has-text-centered"
                >

                  {#if workspace.weather.icon}

                    <figure
                      class="image is-48x48 is-inline-block mb-1"
                    >

                      <img
                        src={`https://openweathermap.org/img/wn/${workspace.weather.icon}@2x.png`}
                        alt={workspace.weather.description}
                      >

                    </figure>

                  {/if}

                  <p
                    class="is-size-7 has-text-weight-semibold"
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
                  class="tag is-success is-light"
                >
                  Lat: {workspace.latitude}
                </span>

                <span
                  class="tag is-success is-light"
                >
                  Lng: {workspace.longitude}
                </span>

              </div>

              {#if workspace.weather}

                <div
                  class="notification is-light py-2 px-3 mt-3 mb-0"
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
              class="card-footer-item button is-white"
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
    class="notification is-light has-text-centered"
  >

    No workspaces added yet.

  </div>

{/if}