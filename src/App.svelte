<script>
  import Header from "./components/Header.svelte";
  import CreateTask from "./components/CreateTask.svelte";
  import SolveTask from "./components/SolveTask.svelte";

  import { firebase } from "../firebase";
</script>

<main class="bg-gray-100 dark:bg-gray-900 h-full w-full">
  <Header />
  <CreateTask />
  <SolveTask />
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
