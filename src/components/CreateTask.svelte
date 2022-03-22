<script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import NewTaskPage from "./NewTaskPage.svelte";

  const auth = getAuth();

  let authState = false;

  let showNewTaskPage = false;

  if (localStorage.getItem("user") != null) {
    const user = localStorage.getItem("user");
    signInWithEmailAndPassword(auth, user.email, user.password);
    authState = true;
  }

  const toggleTaskPage = () => {
    showNewTaskPage = !showNewTaskPage;
  };
</script>

<div class="create-task ml-40 mt-12 relative">
  <h1 class="font-extralight uppercase text-3xl dark:text-gray-300">
    <span class="font-black text-indigo-500 dark:text-indigo-400">Erstelle</span
    > eine Aufgabe
  </h1>

  {#if !authState}
    <p class="text-red-500 mt-2 dark:text-red-400">
      Du bist noch nicht angemeldet bzw. registriert. Melde dich an um eigene
      Aufgaben zu erstellen!
    </p>
  {/if}
  {#if authState}
    <button
      on:click={toggleTaskPage}
      class="bg-green-500 hover:bg-green-600 transition text-white px-8 py-2.5 rounded-md absolute top-0 right-24"
      >Neue Aufabe erstellen</button
    >
    <p class="text-green-500 dark:text-green-400">Du bist eingeloggt!</p>
  {/if}
</div>
{#if showNewTaskPage}
  <div class="container">
    <div
      class="close absolute right-96 hover:cursor-pointer z-50"
      on:click={toggleTaskPage}
    >
      <div class="h-7 w-0.5 bg-gray-900 dark:bg-gray-100 rotate-45 absolute" />
      <div class="h-7 w-0.5 bg-gray-900 dark:bg-gray-100 -rotate-45 absolute" />
    </div>
    <NewTaskPage />
  </div>
{/if}

<style>
  .close {
    top: 5.5rem;
  }
</style>
