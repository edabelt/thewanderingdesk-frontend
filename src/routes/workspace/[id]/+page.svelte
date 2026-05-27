<script lang="ts">

  import { onMount }
    from "svelte";

  import { page }
    from "$app/state";

  import { goto }
    from "$app/navigation";

  import WorkspaceList
    from "$lib/components/WorkspaceList.svelte";

  import AddWorkspaceForm
    from "$lib/components/AddWorkspaceForm.svelte";

  import ErrorMessage
    from "$lib/components/ErrorMessage.svelte";

  import "leaflet/dist/leaflet.css";

  let L: any;

  let map: any;

  let errors =
    $state<any[]>([]);

  let collection =
    $state<any>({
      title: "",
      tracks: []
    });

  function getToken() {

    return localStorage.getItem("token");

  }

  async function loadCollection() {

    errors = [];

    try {

      const token =
        getToken();

      if (!token) {

        await goto("/login");

        return;

      }

      const response =
        await fetch(
          `https://thewanderingdesk-backend.onrender.com/api/categories/${page.params.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      if (response.ok) {

        collection =
          await response.json();

        await buildMap();

      } else {

        errors = [
          {
            message:
              "Unable to load collection"
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

  function buildPopupContent(workspace: any) {

    const weatherHtml =
      workspace.weather
        ? `
          <div style="margin-top: 8px;">
            <strong>Weather:</strong> ${workspace.weather.description}<br>
            <strong>Temperature:</strong> ${workspace.weather.temp} °C
            ${
              workspace.weather.icon
                ? `<br><img
                    src="https://openweathermap.org/img/wn/${workspace.weather.icon}@2x.png"
                    alt="${workspace.weather.description}"
                    style="width: 48px; height: 48px;"
                  >`
                : ""
            }
          </div>
        `
        : `
          <div style="margin-top: 8px;">
            <em>No weather data available</em>
          </div>
        `;

    return `
      <div>
        <strong>${workspace.name}</strong><br>
        ${workspace.locationName}<br>
        <small>
          Lat: ${workspace.latitude},
          Lng: ${workspace.longitude}
        </small>
        ${weatherHtml}
      </div>
    `;

  }

  function getWeatherLayerName(workspace: any) {

    if (!workspace.weather || !workspace.weather.description) {

      return "No Weather Data";

    }

    return workspace.weather.description;

  }

  async function buildMap() {

    const leaflet =
      await import("leaflet");

    L =
      leaflet.default;

    if (map) {

      map.remove();

    }

    map =
      L.map("workspace-map");

    const streetLayer =
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            "&copy; OpenStreetMap contributors"
        }
      );

    const darkLayer =
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            "&copy; OpenStreetMap contributors &copy; CARTO"
        }
      );

    streetLayer.addTo(map);

    const baseLayers = {
      "Street Map": streetLayer,
      "Dark Map": darkLayer
    };

    const overlayLayers: any = {};

    const validWorkspaces =
      collection.tracks.filter(
        (workspace: any) =>
          workspace.latitude &&
          workspace.longitude
      );

    const allMarkers: any[] = [];

    validWorkspaces.forEach(
      (workspace: any) => {

        const layerName =
          getWeatherLayerName(workspace);

        if (!overlayLayers[layerName]) {

          overlayLayers[layerName] =
            L.layerGroup();

        }

        const marker =
          L.marker([
            Number(workspace.latitude),
            Number(workspace.longitude)
          ]);

        marker.bindPopup(
          buildPopupContent(workspace)
        );

        marker.addTo(
          overlayLayers[layerName]
        );

        allMarkers.push(marker);

      }
    );

    Object.values(overlayLayers).forEach(
      (layer: any) => {

        layer.addTo(map);

      }
    );

    L.control
      .layers(
        baseLayers,
        overlayLayers,
        {
          collapsed: false
        }
      )
      .addTo(map);

    if (allMarkers.length > 0) {

      const group =
        L.featureGroup(allMarkers);

      map.fitBounds(
        group.getBounds(),
        {
          padding: [30, 30]
        }
      );

    } else {

      map.setView(
        [53.3498, -6.2603],
        6
      );

    }

  }

  onMount(() => {

    loadCollection();

  });

</script>

<svelte:head>

  <title>
    {collection.title}
  </title>

</svelte:head>

<section class="section">

  <div class="container">

    <div class="mb-5">

      <h1 class="title is-3">
        {collection.title}
      </h1>

      <p class="subtitle is-6">
        Manage the workspaces in this collection.
      </p>

    </div>

    <ErrorMessage {errors} />

    <div class="box mb-5">

      <h2 class="title is-5">
        Weather Map
      </h2>

      <p class="is-size-7 has-text-grey mb-3">
        Markers are grouped into weather-based layers, and each popup shows the workspace location and current weather conditions.
      </p>

      <div
        id="workspace-map"
        style="
          height: 500px;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
        "
      ></div>

    </div>

    <div class="columns is-variable is-6">

      <div class="column is-three-quarters">

        <div class="box">

          <h2 class="title is-5">
            Workspaces
          </h2>

          <WorkspaceList
            workspaces={collection.tracks}
          />

        </div>

      </div>

      <div class="column is-one-quarter">

        <AddWorkspaceForm />

      </div>

    </div>

  </div>

</section>