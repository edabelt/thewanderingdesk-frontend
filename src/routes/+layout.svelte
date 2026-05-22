<script lang="ts">

  import { page } from "$app/state";

  import Navbar
    from "$lib/components/Navbar.svelte";

  import WelcomeNavbar
    from "$lib/components/WelcomeNavbar.svelte";

  import Footer
    from "$lib/components/Footer.svelte";

  let {
    data,
    children
  } = $props();

  const publicRoutes = [
    "/",
    "/about",
    "/login",
    "/signup"
  ];

</script>

<svelte:head>

  <title>
    The Wandering Desk
  </title>

  <meta charset="utf-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
  />

  <link
    rel="icon"
    href="/WDLogo.png"
  />

  <script
    src="https://use.fontawesome.com/releases/v5.15.4/js/all.js">
  </script>

</svelte:head>

{#if publicRoutes.includes(page.url.pathname)}

  <WelcomeNavbar />

{:else}

  <Navbar user={data.user} />

{/if}

<main>

  {@render children()}

</main>

<Footer />

<style>

  :global(html),
  :global(body) {

    height: 100%;

  }

  :global(body) {

    display: flex;
    flex-direction: column;

    background-color: #f7f9fb;

    margin: 0;

  }

  main {

    flex: 1;

  }

  :global(.navbar.is-primary),
  :global(.footer.has-background-primary) {

    background-color: #48c78e !important;

  }

</style>