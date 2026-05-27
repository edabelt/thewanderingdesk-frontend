<script lang="ts">

  import { onMount } from "svelte";

  import CommunityWorkspaceCard
    from "$lib/components/CommunityWorkspaceCard.svelte";

  let workspaces =
    $state<any[]>([]);

  let error =
    $state("");

  async function loadCommunityWorkspaces() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "https://thewanderingdesk-backend.onrender.com/api/community/placemarks",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (response.ok) {

        workspaces =
          await response.json();

      } else {

        error =
          "Unable to load community workspaces";

      }

    } catch (err) {

      error =
        "Unable to connect to server";

    }

  }

  async function rateWorkspace(
    workspaceId: string,
    score: number
  ) {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `https://thewanderingdesk-backend.onrender.com/api/community/placemarks/${workspaceId}/rate`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body:
              JSON.stringify({
                score
              })
          }
        );

      if (response.ok) {

        await loadCommunityWorkspaces();

      } else {

        error =
          "Unable to save rating";

      }

    } catch (err) {

      error =
        "Unable to connect to server";

    }

  }

  onMount(() => {

    loadCommunityWorkspaces();

  });

</script>

<section class="section">

  <div class="container">

    <h1 class="title is-3">
      Community Workspaces
    </h1>

    <p class="subtitle is-6">
      Discover workspaces shared by other users and rate the places you like.
    </p>

    {#if error}

      <div class="notification is-danger">
        {error}
      </div>

    {/if}

    {#if workspaces.length}

      <div class="columns is-multiline">

        {#each workspaces as workspace}

          <div class="column is-half">

            <CommunityWorkspaceCard
              {workspace}
              onRate={rateWorkspace}
            />

          </div>

        {/each}

      </div>

    {:else}

      <div class="notification is-light has-text-centered">
        No public workspaces have been shared yet.
      </div>

    {/if}

  </div>

</section>