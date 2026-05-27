<script lang="ts">

  import { goto }
    from "$app/navigation";

  import ErrorMessage
    from "$lib/components/ErrorMessage.svelte";

  import {
    signInWithPopup
  } from "firebase/auth";

  import {
    auth,
    googleProvider
  } from "$lib/firebase";

  let email =
    $state("");

  let password =
    $state("");

  let errors =
    $state<any[]>([]);

  function storeLogin(
    data: any
  ) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

  }

  async function redirectByRole(
    user: any
  ) {

    if (user.role === "admin") {

      await goto("/admin");

    } else {

      await goto("/dashboard");

    }

  }

  async function login() {

    errors = [];

    try {

      const response =
        await fetch(
          "https://thewanderingdesk-backend.onrender.com/api/users/authenticate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                email,
                password
              })
          }
        );

      if (response.ok) {

        const data =
          await response.json();

        storeLogin(data);

        await redirectByRole(
          data.user
        );

      } else {

        errors = [
          {
            message:
              "Invalid email or password"
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

  async function loginWithGoogle() {

    errors = [];

    try {

      const result =
        await signInWithPopup(
          auth,
          googleProvider
        );

      const firebaseUser =
        result.user;

      const response =
        await fetch(
          "https://thewanderingdesk-backend.onrender.com/api/users/firebase-auth",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({

                email:
                  firebaseUser.email,

                firstName:
                  firebaseUser.displayName
                    ? firebaseUser.displayName.split(" ")[0]
                    : "Google",

                lastName:
                  firebaseUser.displayName
                    ? firebaseUser.displayName
                        .split(" ")
                        .slice(1)
                        .join(" ") || "User"
                    : "User"

              })
          }
        );

      if (response.ok) {

        const data =
          await response.json();

        storeLogin(data);

        await redirectByRole(
          data.user
        );

      } else {

        errors = [
          {
            message:
              "Unable to login with Google"
          }
        ];

      }

    } catch (error) {

      console.log(error);

      errors = [
        {
          message:
            "Google login failed"
          }
        ];

    }

  }

</script>

<svelte:head>

  <title>
    Login | The Wandering Desk
  </title>

</svelte:head>

<section class="section">

  <div class="container">

    <div class="columns is-centered">

      <div class="column is-half">

        <ErrorMessage {errors} />

        <div class="box">

          <h1 class="title is-3 has-text-centered">
            Log In
          </h1>

          <p class="subtitle is-6 has-text-centered">
            Access your The Wandering Desk account
            to manage your workspace collections.
          </p>

          <form
            onsubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >

            <div class="field">

              <label class="label">
                Email
              </label>

              <div class="control">

                <input
                  class="input"
                  type="email"
                  placeholder="Enter your email"
                  bind:value={email}
                  required
                >

              </div>

            </div>

            <div class="field">

              <label class="label">
                Password
              </label>

              <div class="control">

                <input
                  class="input"
                  type="password"
                  placeholder="Enter your password"
                  bind:value={password}
                  required
                >

              </div>

            </div>

            <div class="field">

              <div class="control">

                <button
                  type="submit"
                  class="button is-link is-fullwidth"
                >
                  Log In
                </button>

              </div>

            </div>

          </form>

          <hr>

          <button
            type="button"
            class="button is-light is-fullwidth"
            onclick={loginWithGoogle}
          >
            Log in with Google
          </button>

        </div>

      </div>

    </div>

  </div>

</section>