<script>
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  const auth = getAuth();

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

        localStorage.setItem("name", user.displayName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("pass", user.password);
        localStorage.setItem("method", "email");
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
