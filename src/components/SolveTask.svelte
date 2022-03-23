<script>
  let taskUUID;

  import {
    collection,
    query,
    where,
    onSnapshot,
    getFirestore,
  } from "firebase/firestore";

  let task = [];
  const db = getFirestore();
  let showTask = false;
  let taskName = "";

  let gotTask = false;

  const getTask = (e) => {
    e.preventDefault();
    if (!gotTask) {
      const q = query(collection(db, "tasks"), where("uuid", "==", taskUUID));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          taskName = doc.data().name;
          doc.data().questions.forEach((el) => {
            task = [...task, el];
          });
        });
        console.log(task);
        showTask = true;
        gotTask = true;
      });
    }
  };

  const submitTask = (e) => {
    e.preventDefault();
    let allTrue = 0;
    for (let i = 0; i < task.length; i++) {
      const answer = document.querySelector(`.question-${i + 1}`);
      const solution = task[i].answer;

      if (answer.value == solution) {
        answer.style.color = "rgb(16, 185, 129)";
        allTrue++;
      } else {
        answer.style.color = "rgb(255, 60, 70)";
      }
    }

    if (allTrue == task.length) {
      setTimeout(() => {
        showTask = false;
        taskUUID = "";
      }, 1500);
    }
  };
</script>

<div class="create-task xl:ml-40 lg:ml-16 mt-20 dark:text-white">
  <h1 class="font-extralight uppercase text-3xl dark:text-gray-300">
    <span class="font-black text-indigo-500 dark:text-indigo-400">Erledige</span
    > eine Aufgabe
  </h1>

  <form on:submit={getTask}>
    <input
      bind:value={taskUUID}
      class="pl-4 py-2.5 mb-14 w-96 rounded-lg mt-5 bg-gray-200 dark:bg-gray-800 outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition font-medium placeholder-gray-400 placeholder:font-light placeholder:tracking-wider"
      type="text"
      placeholder="xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    />
    <button
      type="submit"
      class="bg-indigo-500 ml-1 text-white px-10 py-2.5 rounded-lg hover:bg-indigo-600 transition outline-none font-medium"
      >Aufgabe anfangen</button
    >
  </form>

  {#if showTask}
    <form class="thetask" on:submit={submitTask}>
      <h1 class="text-3xl font-black uppercase mb-10">
        {taskName}
      </h1>
      {#each task as question}
        <h1 class="font-bold text-2xl">
          {task.indexOf(question) + 1}. Frage
        </h1>
        <p>{question.question}</p>
        <input
          type="text"
          class="{'question-' +
            (task.indexOf(question) +
              1)} pl-4 py-2.5 w-96 mb-10 rounded-lg mt-2 bg-gray-200 dark:bg-gray-800 outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition font-medium"
          required
        />
      {/each}
      <br />
      <button
        type="submit"
        class="bg-indigo-500 mb-10 text-white px-10 py-2.5 rounded-lg hover:bg-indigo-600 transition outline-none font-medium"
        >Aufgabe fertig</button
      >
    </form>
  {/if}
</div>
