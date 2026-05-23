<script lang="ts">

  import BrandLogo
    from "./BrandLogo.svelte";

  let isActive =
    $state(false);

  function toggleMenu() {

    isActive = !isActive;

  }

  function closeMenu() {

    isActive = false;

  }

</script>

<nav class="navbar is-primary">

  <div class="navbar-brand">

  <a
    class="navbar-item"
    href="/"
    onclick={closeMenu}
  >

    <BrandLogo />

  </a>

  <a
    role="button"
    class="navbar-burger"
    class:is-active={isActive}
    aria-label="menu"
    aria-expanded={isActive}
    onclick={toggleMenu}
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

    <div class="navbar-start">

      <a
        id="about"
        class="navbar-item has-text-white"
        href="/about"
        onclick={closeMenu}
      >
        About
      </a>

    </div>

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