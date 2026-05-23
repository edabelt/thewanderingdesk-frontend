<script lang="ts">

  import { onMount } from "svelte";
  import * as echarts from "echarts";

  let analytics = $state<any>(null);
  let error = $state("");

  let categoryChartElement: HTMLDivElement;
  let projectionChartElement: HTMLDivElement;

  async function loadAnalytics() {
    try {
      const token =
  localStorage.getItem("token");

const response =
  await fetch(
    "http://localhost:3000/api/admin/analytics",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

      if (response.ok) {
        analytics = await response.json();

        setTimeout(() => {
          buildCharts();
        }, 100);
      } else {
        error = "Unable to load admin analytics";
      }
    } catch (err) {
      error = "Unable to connect to backend";
    }
  }

  function buildCharts() {
    const categoryChart = echarts.init(categoryChartElement);
    const projectionChart = echarts.init(projectionChartElement);

    categoryChart.setOption({
      title: { text: "Workspaces per Collection" },
      tooltip: {},
      xAxis: {
        type: "category",
        data: analytics.categoryAnalytics.map((item: any) => item.category)
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "bar",
          data: analytics.categoryAnalytics.map((item: any) => item.count)
        }
      ]
    });

    projectionChart.setOption({
      title: { text: "Projected Workspace Growth" },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["Now", "Next", "Later", "Future"]
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "line",
          data: analytics.projections,
          smooth: true
        }
      ]
    });
  }

  onMount(() => {
    loadAnalytics();
  });

</script>

<section class="section">

  <div class="container">

    <h1 class="title is-3">
      Admin Analytics Dashboard
    </h1>

    <p class="subtitle is-6">
      System-wide overview of users, collections, workspaces, and projected growth.
    </p>

    {#if error}
      <div class="notification is-danger">
        {error}
      </div>
    {/if}

    {#if analytics}

      <div class="columns">

        <div class="column">
          <div class="box has-text-centered">
            <p class="heading">Users</p>
            <p class="title">{analytics.totals.users}</p>
          </div>
        </div>

        <div class="column">
          <div class="box has-text-centered">
            <p class="heading">Collections</p>
            <p class="title">{analytics.totals.categories}</p>
          </div>
        </div>

        <div class="column">
          <div class="box has-text-centered">
            <p class="heading">Workspaces</p>
            <p class="title">{analytics.totals.placemarks}</p>
          </div>
        </div>

      </div>

      <div class="box mt-5">
        <div
          bind:this={categoryChartElement}
          style="width: 100%; height: 380px;"
        ></div>
      </div>

      <div class="box mt-5">
        <div
          bind:this={projectionChartElement}
          style="width: 100%; height: 380px;"
        ></div>
      </div>

    {/if}

  </div>

</section>