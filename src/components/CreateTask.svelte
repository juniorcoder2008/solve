<script>
  import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
  } from "firebase/auth";
  import {
    doc,
    onSnapshot,
    collection,
    query,
    where,
    QuerySnapshot,
    getFirestore,
  } from "firebase/firestore";
  import NewTaskPage from "./NewTaskPage.svelte";
  import Task from "./Task.svelte";

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const db = getFirestore();

  let authState = false;

  let showNewTaskPage = false;

  if (
    localStorage.getItem("name") != null &&
    localStorage.getItem("method") == "email"
  ) {
    const email = localStorage.getItem("email");
    const pass = localStorage.getItem("pass");
    signInWithEmailAndPassword(auth, email, pass);
    authState = true;
  }

  const toggleTaskPage = () => {
    showNewTaskPage = !showNewTaskPage;
  };

  let tasks = [];

  const q = query(
    collection(db, "tasks"),
    where("mail", "==", localStorage.getItem("email"))
  );
  const unsub = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tasks = [...tasks, doc.data()];
    });
  });
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
    <div class="task-list mt-10 flex flex-col gap-5">
      {#each tasks as task}
        <Task name={task.name} qCount={task.amount} uuid={task.uuid} />
      {/each}
    </div>
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
