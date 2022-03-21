<script>
  import Header from "./components/Header.svelte";
  import CreateTask from "./components/CreateTask.svelte";
  import SolveTask from "./components/SolveTask.svelte";
</script>

<main class="bg-gray-100 h-full w-full">
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
