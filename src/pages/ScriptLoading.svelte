<script>
  export let script = "";
  export let step = 1;
</script>

<div class="flex flex-col gap-3 mt-10">
  <div class="font-3xl">Let's start by looking at that script</div>
  <div class="mt-2">
    <textarea
      bind:value={script}
      rows="12"
      type="text"
      class="textarea bg-slate-100 w-full"
      name=""
      id=""
    />
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => (step += 1)}
    class=" mt-4 w-fit bg-yellow-400  items-center gap-3 btn border-0 text-black hover:text-white ml-auto rounded-full"
  >
    <div>Next</div>
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
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  </div>
</div>
