<script lang="ts">

  import { onMount }
    from "svelte";

  import { goto }
    from "$app/navigation";

  import CollectionList
    from "$lib/components/CollectionList.svelte";

  import AddCollectionForm
    from "$lib/components/AddCollectionForm.svelte";

  import ErrorMessage
    from "$lib/components/ErrorMessage.svelte";

  import AnalyticsChart
    from "$lib/components/AnalyticsChart.svelte";

  let collections =
    $state<any[]>([]);

  let errors =
    $state<any[]>([]);

  async function loadCollections() {

    errors = [];

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        await goto("/login");

        return;

      }

      const response =
        await fetch(
          "https://thewanderingdesk-backend.onrender.com/api/categories",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (response.ok) {

        collections =
          await response.json();

      } else {

        errors = [
          {
            message:
              "Unable to load collections"
          }
        ];

      }

    } catch (error) {

      errors = [
        {
          message:
            "Unable to connect to server"
        }
      ];

    }

  }

  onMount(() => {

    loadCollections();

  });

</script>

<svelte:head>

  <title>
    Dashboard | The Wandering Desk
  </title>

</svelte:head>

<section class="section">

  <div class="container">

    <h1 class="title is-3">
      Workspace Dashboard
    </h1>

    <p class="subtitle is-6">
      Manage your collections and workspaces.
    </p>

    <ErrorMessage {errors} />

    <div class="box mb-5">

      <h2 class="title is-5">
        Analytics
      </h2>

      <AnalyticsChart
        collections={collections}
      />

    </div>

    <div class="columns is-variable is-6">

      <div class="column is-two-thirds">

        <div class="box">

          <h2 class="title is-5">
            Your Collections
          </h2>

          <CollectionList
            collections={collections}
          />

        </div>

      </div>

      <div class="column">

        <div class="box">

          <h2 class="title is-5">
            Add New Collection
          </h2>

          <AddCollectionForm />

        </div>

      </div>

    </div>

  </div>

</section>