<script lang="ts">

  import BrandLogo
    from "./BrandLogo.svelte";

  let isActive =
    $state(false);

  function toggleMenu() {

    isActive = !isActive;

  }

</script>

<nav class="navbar is-primary">

  <div class="navbar-brand">

    <BrandLogo />

    <a
      role="button"
      class="navbar-burger"
      class:is-active={isActive}
      aria-label="menu"
      aria-expanded={isActive}
      on:click={toggleMenu}
    >

      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>

    </a>

  </div>

  <div
    class="navbar-menu"
    class:is-active={isActive}
  >

    <div class="navbar-end">

      <a
        class="navbar-item has-text-white"
        href="/signup"
      >
        Sign Up
      </a>

      <a
        class="navbar-item has-text-white"
        href="/login"
      >
        Log In
      </a>

    </div>

  </div>

</nav>