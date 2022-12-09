<script>
  export let script;
  export let step;
  export let sentences;
  let isRecording = false;
</script>

<div class="grid grid-cols-3 gap-5 mt-10 text-lg">
  <div class="max-h-[80vh] col-span-2 overflow-auto pr-6">
    {script}
  </div>
  <div class="flex flex-col gap-3">
    <div class="flex p-2 rounded-2xl bg-yellow-100 w-full">Video</div>

    <div class="flex p-2">
      {#if isRecording}
        <div class="flex  gap-2 items-center justify-between w-full">
          <div class=" animate-pulse">🔴</div>
          <div class="text-red animate-pulse">Recording...</div>
          <div class="btn rounded-full btn-outline btn-xs ml-auto">
            Stop Recording
          </div>
        </div>
      {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={() => (isRecording = true)}
          class="btn rounded-full btn-xs"
        >
          Record
        </div>
      {/if}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
    </div>
  </div>
</div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:click={() => (step -= 1)}
  class=" items-center gap-3 btn btn-outline mt-10 rounded-full"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
  <div>Go back</div>
</div>
