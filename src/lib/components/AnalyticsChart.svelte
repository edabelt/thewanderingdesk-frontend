<script lang="ts">

  import { onDestroy }
    from "svelte";

  import * as echarts
    from "echarts";

  let {
    collections = []
  } = $props<{
    collections?: any[];
  }>();

  let chartElement: HTMLDivElement;

  let chart: echarts.ECharts | null =
    null;

  let totalCollections =
    $derived(collections.length);

  let totalWorkspaces =
    $derived(
      collections.reduce(
        (total: number, collection: any) =>
          total + (collection.tracks ? collection.tracks.length : 0),
        0
      )
    );

  let averageWorkspaces =
    $derived(
      totalCollections > 0
        ? (totalWorkspaces / totalCollections).toFixed(1)
        : "0"
    );

  function renderChart() {

    if (!chartElement) {
      return;
    }

    if (!chart) {
      chart =
        echarts.init(chartElement);
    }

    const names =
      collections.map(
        (collection: any) => collection.title
      );

    const totals =
      collections.map(
        (collection: any) =>
          collection.tracks
            ? collection.tracks.length
            : 0
      );

    chart.setOption({
      title: {
        text: "Workspaces per Collection",
        left: "center"
      },

      tooltip: {
        trigger: "axis"
      },

      grid: {
        left: "5%",
        right: "5%",
        bottom: "10%",
        containLabel: true
      },

      xAxis: {
        type: "category",
        data: names
      },

      yAxis: {
        type: "value",
        minInterval: 1
      },

      series: [
        {
          name: "Workspaces",
          type: "bar",
          data: totals,
          barMaxWidth: 50
        }
      ]
    });

  }

  $effect(() => {

    collections;

    renderChart();

  });

  onDestroy(() => {

    if (chart) {
      chart.dispose();
    }

  });

</script>

<div class="columns is-variable is-4 mb-4">

  <div class="column">

    <div class="notification is-primary is-light has-text-centered">

      <p class="heading">
        Collections
      </p>

      <p class="title is-4">
        {totalCollections}
      </p>

    </div>

  </div>

  <div class="column">

    <div class="notification is-info is-light has-text-centered">

      <p class="heading">
        Workspaces
      </p>

      <p class="title is-4">
        {totalWorkspaces}
      </p>

    </div>

  </div>

  <div class="column">

    <div class="notification is-success is-light has-text-centered">

      <p class="heading">
        Average per Collection
      </p>

      <p class="title is-4">
        {averageWorkspaces}
      </p>

    </div>

  </div>

</div>

<div
  bind:this={chartElement}
  style="
    width: 100%;
    height: 330px;
  "
></div>