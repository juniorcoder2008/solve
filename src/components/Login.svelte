<script>
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";

  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  let register = false;

  let email;
  let password;

  let regMail;
  let regPass;

  const login = (e) => {
    e.preventDefault();
    console.log("test");
    signInWithEmailAndPassword(auth, email, password)
      .then((info) => {
        const user = info.user;

        localStorage.setItem("user", user);
        localStorage.setItem("method", "email");
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((info) => {
        const user = info.user;

        localStorage.setItem("user", user);
        localStorage.setItem("method", "google");
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const registerNewAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, regMail, regPass)
      .then((info) => {
        const user = info.user;

        localStorage.setItem("user", user);
        localStorage.setItem("method", "email");
        location.reload();
      })
      .catch((err) => console.log(err));
  };
</script>

{#if !register}
  <div
    class="login z-20 absolute top-0 bg-gray-200 dark:bg-gray-800 dark:text-white"
  >
    <h1 class="text-4xl font-black text-center mt-20">Login</h1>

    <form
      on:submit={login}
      class="absolute top-48 left-1/2 -translate-x-1/2 flex flex-col gap-4"
    >
      <input
        class="py-2 w-96 rounded-md bg-gray-300 dark:bg-gray-700 pl-4 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
        type="email"
        placeholder="Email Adresse..."
        bind:value={email}
      />
      <div class="pass">
        <input
          class="py-2 w-96 rounded-md bg-gray-300 dark:bg-gray-700 pl-4 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
          type="password"
          placeholder="Passwort..."
          bind:value={password}
        />
      </div>
      <p>
        Hast du noch keinen Account? Dann <span
          class="text-indigo-500 underline dark:text-indigo-400 cursor-pointer"
          href="/"
          on:click={() => (register = true)}>registriere</span
        > dich!
      </p>

      <button
        class="mt-5 w-full bg-indigo-500 text-white py-2.5 rounded-md font-medium hover:bg-indigo-600 transition"
        type="submit">Login</button
      >
      <button
        on:click={loginGoogle}
        class="mt-2 w-full bg-white dark:text-black py-2.5 rounded-md font-medium hover:bg-gray-100 transition flex align-middle justify-center gap-3"
        type="button"
        ><svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path
              fill="#4285F4"
              d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
            />
            <path
              fill="#34A853"
              d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
            />
            <path
              fill="#FBBC05"
              d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
            />
            <path
              fill="#EA4335"
              d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
            />
          </g>
        </svg>Login mit Google</button
      >
    </form>
  </div>
{:else if register}
  <div
    class="login z-20 absolute top-0 bg-gray-200 dark:bg-gray-800 dark:text-white"
  >
    <h1 class="text-4xl font-black text-center mt-20">Account erstellen</h1>

    <form
      on:submit={registerNewAccount}
      class="absolute top-48 left-1/2 -translate-x-1/2 flex flex-col gap-4"
    >
      <input
        class="py-2 w-96 rounded-md bg-gray-300 dark:bg-gray-700 pl-4 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
        type="email"
        placeholder="Email Adresse"
        bind:value={regMail}
      />
      <div class="pass">
        <input
          class="py-2 w-96 rounded-md bg-gray-300 dark:bg-gray-700 pl-4 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
          type="password"
          placeholder="Passwort (min. 6 Zeichen)"
          bind:value={regPass}
        />
      </div>
      <p>
        Hast du schon einen Account? Dann <span
          class="text-indigo-500 underline cursor-pointer dark:text-indigo-400"
          href="/"
          on:click={() => (register = false)}>melde dich an</span
        >!
      </p>

      <button
        class="mt-5 w-full bg-indigo-500 text-white py-2.5 rounded-md font-medium hover:bg-indigo-600 transition"
        type="submit">Registrieren</button
      >
    </form>
  </div>
{/if}
