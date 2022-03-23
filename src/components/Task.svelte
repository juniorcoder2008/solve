<script>
  export let name;
  export let qCount;
  export let uuid;

  $: qCountText =
    qCount == 1 ? `<span>1</span> Frage` : `<span>${qCount}</span> Fragen`;
</script>

<div
  class="task xl:w-3/4 lg:w-10/12 flex justify-end gap-12 dark:bg-gray-700 dark:text-white py-3 px-5 rounded-md bg-gray-200 relative"
>
  <h1 class="uppercase font-bold absolute left-5">{name}</h1>
  <p>{qCountText}</p>
  <p class="text-indigo-400 font-medium">
    {uuid}
  </p>
</div>
