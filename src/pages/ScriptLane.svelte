<script>
  import { onMount } from "svelte";
  import { diffSentences } from "diff";

  export let script;
  export let transcribedScript;

  let showDiff = true;
  let dd = [];
  onMount(() => {
    dd = diffSentences(script, transcribedScript);

    console.log(dd);
  });
</script>

<div class="grid grid-cols-2 w-full gap-10 ">
  <div class="mt-9">
    {script}
  </div>
  <div class="flex flex-col">
    <div class="flex mb-2 gap-3 items-center">
      <div>Show difference</div>
      <input type="checkbox" class="toggle toggle-sm" bind:checked={showDiff} />
    </div>

    <div>
      {#each dd as { value, added, removed }}
        {#if showDiff}
          <span
            class={`${
              added ? "text-green-400" : removed ? "text-red-500" : " "
            }`}>{value}</span
          >
        {:else if added || (added === undefined && removed === undefined)}
          <span
            class={`${
              added ? "text-green-400" : removed ? "text-red-500" : ""
            }`}>{value}</span
          >
        {/if}
      {/each}
    </div>
  </div>
</div>
