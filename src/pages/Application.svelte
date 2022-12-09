<script>
  import { onMount } from "svelte";
  import GrammarCheck from "./GrammarCheck.svelte";
  import Practice from "./Practice.svelte";
  import ScriptLoading from "./ScriptLoading.svelte";

  let step = 0;
  let script = "";
  let takelist = [
    "1/3 Create Take",
    "2/3 Grammar checking",
    "3/3 Record your take",
  ];
  let scriptname = "";

  onMount(() => {
    script =
      "He scolded himself for being so tentative. He knew he shouldn't be so cautious, but there was a sixth sense telling him that things weren't exactly as they appeared. It was that weird chill that rolls up your neck and makes the hair stand on end. He knew that being so tentative could end up costing him the job, but he learned that listening to his sixth sense usually kept him from getting into a lot of trouble.";
  });
</script>

<section
  class="max-w-screen-lg bg-white dark:bg-gray-800 p-10   mx-auto min-h-screen h-full "
>
  <div class="flex justify-between items-center">
    <div>
      <div class=" text-xl font-bold">Speechinator - 3000</div>
      <div class="opacity-50">present like there is no tomorrow</div>
    </div>

    <div>{takelist[step]}</div>
  </div>
  <div class="divider" />

  {#if step === 0}
    <ScriptLoading bind:script bind:step bind:scriptname />
  {/if}
  {#if step === 1}
    <GrammarCheck bind:script bind:step />
  {/if}
  {#if step === 2}
    <Practice bind:script bind:step bind:scriptname />
  {/if}
</section>
