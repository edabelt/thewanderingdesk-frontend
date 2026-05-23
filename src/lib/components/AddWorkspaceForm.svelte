<script lang="ts">

  import { page }
    from "$app/state";

  import {
    initializeApp
  } from "firebase/app";

  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";

  let name =
    $state("");

  let locationName =
    $state("");

  let latitude =
    $state("");

  let longitude =
    $state("");

  let description =
    $state("");

  let imageFiles: FileList | null =
    null;

  const firebaseConfig = {
    apiKey: "AIzaSyA8m4KeL2KeZ97wsJ5oIHPoCmSTcl9W1y4",
    authDomain: "placemark-ae1ce.firebaseapp.com",
    projectId: "placemark-ae1ce",
    storageBucket: "placemark-ae1ce.firebasestorage.app",
    messagingSenderId: "953068667904",
    appId: "1:953068667904:web:b65bc29a89277f1d1f04e5"
  };

  const app =
    initializeApp(firebaseConfig);

  const storage =
    getStorage(app);

  async function findCoordinates() {

    if (!locationName.trim()) {
      alert("Please enter a location");
      return;
    }

    try {

      const response =
        await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`
        );

      const data =
        await response.json();

      if (data.length === 0) {
        alert("Location not found");
        return;
      }

      latitude =
        data[0].lat;

      longitude =
        data[0].lon;

    } catch (error) {

      console.error(error);

      alert("Unable to find coordinates");

    }

  }

  async function addWorkspace() {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in");
        return;
      }

      let imageUrl =
        "";

      const imageUrls: string[] =
        [];

      if (imageFiles && imageFiles.length > 0) {

        for (const file of Array.from(imageFiles)) {

          const fileName =
            `${Date.now()}-${file.name}`;

          const storageRef =
            ref(
              storage,
              `placemarks/${fileName}`
            );

          await uploadBytes(
            storageRef,
            file
          );

          const url =
            await getDownloadURL(
              storageRef
            );

          imageUrls.push(url);

        }

        imageUrl =
          imageUrls[0];

      }

      const categoryId =
        page.params.id;

      const workspace = {
        name,
        locationName,
        latitude,
        longitude,
        description,
        image: imageUrl,
        images: imageUrls
      };

      const response =
        await fetch(
          `http://localhost:3000/api/categories/${categoryId}/placemarks`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(workspace)
          }
        );

      if (response.ok) {

        window.location.reload();

      } else {

        const error =
          await response.json();

        console.log(error);

        alert("Unable to add workspace");

      }

    } catch (error) {

      console.error(error);

      alert("Error creating workspace");

    }

  }

</script>

<form
  class="box"
  onsubmit={(e) => {
    e.preventDefault();
    addWorkspace();
  }}
>

  <h2 class="title is-4 mb-5">
    Add New Workspace
  </h2>

  <div class="field">

    <label class="label">
      Name
    </label>

    <div class="control">

      <input
        class="input"
        type="text"
        bind:value={name}
        placeholder="Enter place name"
        required
      >

    </div>

  </div>

  <div class="field">

    <label class="label">
      Location Name
    </label>

    <div class="control has-addons">

      <input
        class="input"
        type="text"
        bind:value={locationName}
        placeholder="Enter city or place"
        required
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
            bind:value={latitude}
            placeholder="Latitude"
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
            bind:value={longitude}
            placeholder="Longitude"
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
        bind:value={description}
        placeholder="Describe this place"
      ></textarea>

    </div>

  </div>

  <div class="field">

    <label class="label">
      Image Gallery
    </label>

    <div class="control">

      <input
        class="input"
        type="file"
        accept="image/*"
        multiple
        onchange={(e) => {
          imageFiles =
            e.currentTarget.files;
        }}
      >

    </div>

    <p class="help">
      You can select one or more images for this workspace.
    </p>

  </div>

  <div class="field mt-5">

    <div class="control">

      <button
        class="button is-primary is-fullwidth"
        type="submit"
      >
        Add Workspace
      </button>

    </div>

  </div>

</form>