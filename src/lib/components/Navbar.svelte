<script lang="ts">

  import { onMount }
    from "svelte";

  import BrandLogo
    from "./BrandLogo.svelte";

  let isActive =
    $state(false);

  let loggedUser =
    $state<any>(null);

  onMount(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      loggedUser =
        JSON.parse(storedUser);

    }

  });

  function toggleMenu() {

    isActive =
      !isActive;

  }

  function closeMenu() {

    isActive =
      false;

  }

  function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    closeMenu();

  }

</script>

<nav
  class="navbar is-primary"
  role="navigation"
  aria-label="main navigation"
>

  <div class="navbar-brand">

    <a
      class="navbar-item"
      href="/dashboard"
      onclick={closeMenu}
    >

      <BrandLogo />

    </a>

    <button
      type="button"
      class="navbar-burger"
      class:is-active={isActive}
      aria-label="menu"
      aria-expanded={isActive}
      onclick={toggleMenu}
    >

      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>

    </button>

  </div>

  <div
    id="navMenu"
    class="navbar-menu"
    class:is-active={isActive}
  >

    <div class="navbar-start">

      <a
        id="dashboard"
        class="navbar-item has-text-white"
        href="/dashboard"
        onclick={closeMenu}
      >
        Dashboard
      </a>

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

      {#if loggedUser}

        <div class="navbar-item has-text-white">

          Hello,
          {loggedUser.firstName}

        </div>

      {/if}

      <div class="navbar-item">

        <a
          id="logout"
          class="button is-light is-small"
          href="/"
          onclick={logout}
        >
          Logout
        </a>

      </div>

    </div>

  </div>

</nav>