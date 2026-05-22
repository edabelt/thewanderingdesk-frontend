<script lang="ts">

  import { goto }
    from "$app/navigation";

  import ErrorMessage
    from "$lib/components/ErrorMessage.svelte";

  let email =
    $state("");

  let password =
    $state("");

  let errors =
    $state<any[]>([]);

  async function login() {

    errors = [];

    try {

      const response =
        await fetch(
          "http://localhost:3000/api/users/authenticate",
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

localStorage.setItem(
  "token",
  data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

await goto("/dashboard");

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

        </div>

      </div>

    </div>

  </div>

</section>