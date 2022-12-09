<script>
  import GrammarCheck from "./GrammarCheck.svelte";
  import Practice from "./Practice.svelte";
  import ScriptLoading from "./ScriptLoading.svelte";

  let step = 2;
  let script =
    "He scolded himself for being so tentative. He knew he shouldn't be so cautious, but there was a sixth sense telling him that things weren't exactly as they appeared. It was that weird chill that rolls up your neck and makes the hair stand on end. He knew that being so tentative could end up costing him the job, but he learned that listening to his sixth sense usually kept him from getting into a lot of trouble.";
  let sentences;
  $: {
    if (script) sentences = script.split(".");
  }
</script>

<section class="max-w-screen-lg bg-white p-10   mx-auto min-h-screen h-full ">
  <div class=" text-xl font-bold">Speechinator - 3000</div>
  <div class="">present like there is no tomorrow</div>
  {#if step === 0}
    <ScriptLoading bind:script bind:step />
  {/if}
  {#if step === 1}
    <GrammarCheck bind:script bind:step bind:sentences />
  {/if}
  {#if step === 2}
    <Practice bind:script bind:step bind:sentences />
  {/if}
</section>
