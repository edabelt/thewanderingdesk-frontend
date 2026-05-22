<script lang="ts">

  import { onMount }
    from "svelte";

  import { page }
    from "$app/state";

  import { goto }
    from "$app/navigation";

  import ErrorMessage
    from "$lib/components/ErrorMessage.svelte";

  import {
    initializeApp
  } from "firebase/app";

  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";

  let errors =
    $state<any[]>([]);

  let workspace =
    $state<any>({
      name: "",
      locationName: "",
      latitude: "",
      longitude: "",
      description: "",
      image: "",
      playlistid: ""
    });

  let imageFile: File | null =
    null;

  const firebaseConfig = {

    apiKey:
      "AIzaSyA8m4KeL2KeZ97wsJ5oIHPoCmSTcl9W1y4",

    authDomain:
      "placemark-ae1ce.firebaseapp.com",

    projectId:
      "placemark-ae1ce",

    storageBucket:
      "placemark-ae1ce.firebasestorage.app",

    messagingSenderId:
      "953068667904",

    appId:
      "1:953068667904:web:b65bc29a89277f1d1f04e5"

  };

  const app =
    initializeApp(firebaseConfig);

  const storage =
    getStorage(app);

  onMount(() => {

    loadWorkspace();

  });

  function getToken() {

    return localStorage.getItem("token");

  }

  async function loadWorkspace() {

    try {

      const token =
        getToken();

      if (!token) {

        await goto("/login");

        return;

      }

      const response =
        await fetch(
          `http://localhost:3000/api/placemarks/${page.params.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (response.ok) {

        workspace =
          await response.json();

      } else {

        errors = [
          {
            message:
              "Unable to load workspace"
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

  async function findCoordinates() {

    if (!workspace.locationName.trim()) {

      alert(
        "Please enter a location"
      );

      return;

    }

    const response =
      await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(workspace.locationName)}`
      );

    const data =
      await response.json();

    if (data.length === 0) {

      alert(
        "Location not found"
      );

      return;

    }

    workspace.latitude =
      data[0].lat;

    workspace.longitude =
      data[0].lon;

  }

  function handleImageChange(
    event: Event
  ) {

    const target =
      event.currentTarget as HTMLInputElement;

    imageFile =
      target.files?.[0] || null;

  }

  function deleteImage() {

    workspace.image = "";

    imageFile = null;

  }

  async function updateWorkspace() {

    try {

      const token =
        getToken();

      if (!token) {

        await goto("/login");

        return;

      }

      let imageUrl =
        workspace.image;

      if (imageFile) {

        const fileName =
          `${Date.now()}-${imageFile.name}`;

        const storageRef =
          ref(
            storage,
            `placemarks/${fileName}`
          );

        await uploadBytes(
          storageRef,
          imageFile
        );

        imageUrl =
          await getDownloadURL(
            storageRef
          );

      }

      const response =
        await fetch(
          `http://localhost:3000/api/placemarks/${page.params.id}`,
          {
            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`

            },

            body:
              JSON.stringify({

                name:
                  workspace.name,

                locationName:
                  workspace.locationName,

                latitude:
                  workspace.latitude,

                longitude:
                  workspace.longitude,

                description:
                  workspace.description,

                image:
                  imageUrl

              })

          }
        );

      if (response.ok) {

        await goto(
          `/workspace/${workspace.playlistid}`
        );

      } else {

        errors = [
          {
            message:
              "Unable to update workspace"
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

</script>

<svelte:head>

  <title>
    Edit Workspace
  </title>

</svelte:head>

<section class="section">

  <div class="container">

    <div class="columns is-centered">

      <div class="column is-half">

        <div class="box">

          <h1 class="title is-4">
            Edit Workspace
          </h1>

          <ErrorMessage {errors} />

          <div class="mb-5">

            <button
              class="button is-light"
              onclick={() => goto(`/workspace/${workspace.playlistid}`)}
            >
              Back to Workspaces
            </button>

          </div>

          <form
            onsubmit={(e) => {
              e.preventDefault();
              updateWorkspace();
            }}
          >

            <div class="field">

              <label class="label">
                Name
              </label>

              <div class="control">

                <input
                  class="input"
                  type="text"
                  placeholder="Enter workspace name"
                  bind:value={workspace.name}
                >

              </div>

            </div>

            <div class="field">

              <label class="label">
                Location
              </label>

              <div class="control has-addons">

                <input
                  class="input"
                  type="text"
                  placeholder="Enter city or place"
                  bind:value={workspace.locationName}
                >

                <button
                  type="button"
                  class="button is-info"
                  onclick={findCoordinates}
                >
                  Find
                </button>

              </div>

            </div>

            <div class="columns">

              <div class="column">

                <div class="field">

                  <label class="label">
                    Latitude
                  </label>

                  <div class="control">

                    <input
                      class="input"
                      type="text"
                      bind:value={workspace.latitude}
                    >

                  </div>

                </div>

              </div>

              <div class="column">

                <div class="field">

                  <label class="label">
                    Longitude
                  </label>

                  <div class="control">

                    <input
                      class="input"
                      type="text"
                      bind:value={workspace.longitude}
                    >

                  </div>

                </div>

              </div>

            </div>

            <div class="field">

              <label class="label">
                Description
              </label>

              <div class="control">

                <textarea
                  class="textarea"
                  placeholder="Write a short description of the place (max 500 characters)"
                  bind:value={workspace.description}
                ></textarea>

              </div>

            </div>

            <div class="field">

              <label class="label">
                Image File
              </label>

              <div class="control">

                <input
                  class="input"
                  type="file"
                  accept="image/*"
                  onchange={handleImageChange}
                >

              </div>

            </div>

            {#if workspace.image}

              <div class="field">

                <label class="label">
                  Current Image
                </label>

                <figure class="image is-4by3 mb-3">

                  <img
                    src={workspace.image}
                    alt={workspace.name}
                    style="
                      object-fit: cover;
                      border-radius: 8px;
                    "
                  >

                </figure>

                <button
                  type="button"
                  class="button is-danger is-light is-small"
                  onclick={deleteImage}
                >
                  Delete Image
                </button>

              </div>

            {/if}

            <div class="field mt-5">

              <div class="control">

                <button
                  class="button is-primary is-fullwidth"
                >
                  Update Workspace
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>

</section>