<script lang="ts">

  import { goto }
    from "$app/navigation";

  import ErrorMessage
    from "$lib/components/ErrorMessage.svelte";

  let firstName =
    $state("");

  let lastName =
    $state("");

  let email =
    $state("");

  let password =
    $state("");

  let errors =
    $state<any[]>([]);

  async function signup() {

    errors = [];

    try {

      const response =
  await fetch(
    "http://localhost:3000/api/users",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    }
  );

      if (response.ok) {

        await goto("/login");

      } else {

        errors = [
          {
            message:
              "Unable to create account"
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
    Sign Up | The Wandering Desk
  </title>

</svelte:head>

<section class="section">

  <div class="container">

    <div class="columns is-centered">

      <div class="column is-half">

        <ErrorMessage {errors} />

        <div class="box">

          <h1 class="title is-3 has-text-centered">
            Create an Account
          </h1>

          <p class="subtitle is-6 has-text-centered">
            Sign up to start listing and managing
            your workspaces.
          </p>

          <form
            onsubmit={(e) => {
              e.preventDefault();
              signup();
            }}
          >

            <label class="label">
              Name
            </label>

            <div class="field is-horizontal">

              <div class="field-body">

                <div class="field">

                  <div class="control">

                    <input
                      class="input"
                      type="text"
                      placeholder="First name"
                      bind:value={firstName}
                      required
                    >

                  </div>

                </div>

                <div class="field">

                  <div class="control">

                    <input
                      class="input"
                      type="text"
                      placeholder="Last name"
                      bind:value={lastName}
                      required
                    >

                  </div>

                </div>

              </div>

            </div>

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
                  class="button is-primary is-fullwidth"
                >
                  Sign Up
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  </div>

</section>