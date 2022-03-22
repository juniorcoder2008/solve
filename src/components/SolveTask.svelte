<script>
  import { db } from "../firebase";
  import { collection, addDoc } from "firebase/firestore";

  let taskUUID;
</script>

<div class="create-task ml-40 mt-20">
  <h1 class="font-extralight uppercase text-3xl dark:text-gray-300">
    <span class="font-black text-indigo-500 dark:text-indigo-400">Erledige</span
    > eine Aufgabe
  </h1>

  <form>
    <input
      bind:value={taskUUID}
      class="pl-4 py-2.5 w-96 rounded-md mt-5 bg-gray-200 dark:bg-gray-800 outline-none focus:text-indigo-500 dark:focus:text-indigo-400 transition font-medium placeholder-gray-400 placeholder:font-light placeholder:tracking-wider"
      type="text"
      placeholder="xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    />
    <button
      type="submit"
      class="bg-indigo-500 text-white px-10 py-2.5 rounded-md hover:bg-indigo-600 transition outline-none font-medium"
      >Aufgabe anfangen</button
    >
  </form>
</div>
