<script lang="ts">

  let {
    collection
  } = $props<{
    collection: any;
  }>();

  async function deleteCollection() {

    const confirmed =
      confirm(
        "Delete this collection?"
      );

    if (!confirmed) {

      return;

    }

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `https://thewanderingdesk-backend.onrender.com/api/categories/${collection._id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (response.ok) {

        window.location.reload();

      } else {

        alert(
          "Unable to delete collection"
        );

      }

    } catch (error) {

      alert(
        "Unable to connect to server"
      );

    }

  }

</script>

<div class="box mb-4">

  <div class="is-flex is-justify-content-space-between is-align-items-center">

    <h2 class="title is-5 mb-0">
      {collection.title}
    </h2>

    <div class="buttons mb-0">

      <a
        href={`/workspace/${collection._id}`}
        class="button is-link is-light"
      >
        Open
      </a>

      <button
        class="button is-danger is-light"
        onclick={deleteCollection}
      >
        Delete
      </button>

    </div>

  </div>

</div>