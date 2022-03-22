<script>
  import { range } from "./range.js";
  import { v4 } from "uuid";

  let taskName;
  let questionAmount;

  let finalQAmount = 0;

  let showQuestionSubmit;

  let task = {
    name: "",
    uuid: v4(),
    amount: finalQAmount,
    questions: [],
  };

  let questionsCompleted = false;

  const createQuestions = (e) => {
    task["name"] = taskName;
    console.log("test");
    e.preventDefault();
    finalQAmount = questionAmount;
  };

  const submitQuestion = (q, a) => {
    task["questions"] = [...task["questions"], { question: q, answer: a }];
    console.log(task);
  };
</script>

<div
  class="new-task-page bg-gray-200 dark:text-white dark:bg-gray-800 absolute top-0 left-0"
>
  <h1 class="text-4xl font-black text-center mt-20">Neue Aufgabe erstellen</h1>

  <form
    on:submit={createQuestions}
    class="flex flex-col gap-3 justify-center w-96 align-middle relative mx-auto mt-20"
  >
    <input
      class="py-2.5 w-96 rounded-md text-center bg-gray-300 dark:bg-gray-700 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
      type="text"
      placeholder="Name der Aufgabe"
      bind:value={taskName}
    />
    <input
      class="py-2.5 invalid:text-red-500 dark:invalid:bg-red-400 dark:focus:invalid:text-white dark:invalid:text-white relative w-96 text-center rounded-md appearance-none outline-none bg-gray-300 dark:bg-gray-700 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
      type="number"
      placeholder="Anzahl der Fragen (max. 50)"
      max="50"
      bind:value={questionAmount}
    />
    <button
      class="mt-5 px-10 mb-24 bg-indigo-500 text-white py-2.5 rounded-md font-medium hover:bg-indigo-600 transition"
      >Fragen erstellen</button
    >
  </form>

  <div class="questions">
    {#each range(finalQAmount) as q}
      <h2 class="{'heading-' + (q + 1)} text-center text-2xl font-bold mb-5">
        Frage {q + 1}
      </h2>
      <form
        class="{'form-' + (q + 1)} inputs flex flex-col gap-3"
        on:submit={(e) => {
          e.preventDefault();
          const question = document.querySelector(`.question-${q + 1}`);
          const answer = document.querySelector(`.answer-${q + 1}`);
          const heading = document.querySelector(`.heading-${q + 1}`);

          const form = document.querySelector(`.form-${q + 1}`);
          submitQuestion(question.value, answer.value);
          form.remove();

          heading.innerHTML = `Die ${
            q + 1
          }. Frage ist <span class="text-green-400 font-black">vollständig</span>`;
          heading.classList.add("font-light");
          console.log(document.querySelector(".questions"));
          console.log(
            !document
              .querySelector(".questions")
              .contains(document.querySelector("form"))
          );

          if (
            !document
              .querySelector(".questions")
              .contains(document.querySelector(".inputs"))
          ) {
            questionsCompleted = true;
            document.querySelector(".questions").innerHTML = "";
          }
        }}
      >
        <input
          type="text"
          class="{'question-' +
            (q +
              1)} relative mx-auto py-2.5 w-96 rounded-md bg-gray-300 dark:bg-gray-700 pl-4 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
          placeholder="Frage..."
          required
        />
        <input
          type="text"
          class="{'answer-' +
            (q +
              1)} relative mx-auto py-2.5 w-96 rounded-md bg-gray-300 dark:bg-gray-700 pl-4 focus:outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition"
          placeholder="Antwort..."
          required
        />
        <button
          class="{'submit-' +
            (q +
              1)} mt-2 relative mb-20 mx-auto w-96 px-10 bg-blue-500 text-white py-2.5 rounded-md font-medium hover:bg-blue-600 transition"
          >Frage abschließen</button
        >
      </form>
    {/each}

    {#if questionsCompleted}
      <div class="relative">
        <p class="text-center">Alle Fragen sind jetzt vollständig!</p>

        <button
          class="mt-2 mb-20 w-64 absolute left-1/2 -translate-x-1/2 top-8 px-10 bg-indigo-500 text-white py-2.5 rounded-md font-medium hover:bg-indigo-600 transition"
          >Aufgabe speichern</button
        >
      </div>
    {/if}
  </div>
</div>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
