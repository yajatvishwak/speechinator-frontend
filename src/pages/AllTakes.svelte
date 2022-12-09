<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  let data = {
    123: [{ practiceid: "asd", createdAt: "asd" }],
  };
  onMount(async () => {
    const res = await axios.get("http://localhost:5000/getalltakes");
    if (res.data) {
      console.log(res.data);
      data = res.data.takes;
    }
  });
</script>

<section
  class="max-w-screen-lg bg-white dark:bg-gray-800 p-10   mx-auto min-h-screen h-full "
>
  <div class="flex justify-between">
    <div>
      <div class=" text-xl font-bold">Speechinator - 3000</div>
      <div class="opacity-50">present like there is no tomorrow</div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => {
        push("/");
      }}
      class="btn rounded-full flex items-center gap-2 bg-yellow-400 text-black hover:text-white btn-sm  "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>

      <div>Add a script</div>
    </div>
  </div>
  <div class="divider" />

  <div class="text-3xl">All your previous takes</div>
  <div class="my-5">
    {#each Object.keys(data) as script}
      <div class="mb-2">{script}</div>
      <div
        class="flex flex-col overflow-auto  bg-slate-200 dark:bg-slate-900 p-3 rounded-xl"
      >
        {#each data[script] as take, index}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={() => push("/take/" + take.practiceid)}
            class="p-3 px-4 dark:bg-slate-700 bg-slate-100  rounded-xl w-fit hover:scale-95 transition-all cursor-pointer"
          >
            <div>Take {index + 1}</div>
            <div class="text-xs opacity-50">
              {data[script][index].createdAt}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</section>
