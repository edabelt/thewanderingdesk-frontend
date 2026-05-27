<script lang="ts">

  let title =
    $state("");

  let message =
    $state("");

  async function addCollection() {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        message =
          "You must be logged in";

        return;

      }

      const response =
        await fetch(
          "https://thewanderingdesk-backend.onrender.com/api/categories",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              title
            })
          }
        );

      if (response.ok) {

        message =
          "Collection created successfully";

        title = "";

        window.location.reload();

      } else {

        message =
          "Unable to create collection";

      }

    } catch (error) {

      message =
        "Unable to connect to server";

    }

  }

</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    addCollection();
  }}
>

  <div class="field">

    <label class="label">
      Collection Name
    </label>

    <div class="control">

      <input
        class="input"
        type="text"
        placeholder="Enter collection name"
        bind:value={title}
        required
      >

    </div>

  </div>

  <div class="field">

    <div class="control">

      <button
        class="button is-primary is-fullwidth"
        type="submit"
      >
        Add Collection
      </button>

    </div>

  </div>

  {#if message}

    <p class="mt-3">
      {message}
    </p>

  {/if}

</form>