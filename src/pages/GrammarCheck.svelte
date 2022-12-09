<script>
  import axios from "axios";
  import { onMount } from "svelte/internal";

  export let script = "";
  export let step;
  let sentences = [];
  let loading = false;
  let suggestions = [];

  async function correctGrammar(text) {
    // call huggingface or server
    // console.log("this is text :", text);
    if (text) {
      const { data } = await axios.post(
        "http://localhost:5000/correct-grammar",
        {
          text: text,
        }
      );
      // console.log(data);
      return data.corrected;
    }
    return "";
  }

  async function resolveSuggestion() {
    loading = true;
    sentences = script
      .split(".")
      .filter((item) => {
        console.log(item);
        if (item) {
          return true;
        } else {
          return false;
        }
      })
      .map((item) => item + ".");
    if (sentences.length > 0) {
      for (let index = 0; index < sentences.length; index++) {
        const sentence = sentences[index];
        let suggestion = await correctGrammar(sentence);
        if (sentence) {
          suggestions.push({
            text: sentence,
            isAccepted: false,
            isModified: suggestion.trim() !== sentence.trim(),
            index,
            suggestion,
          });
          suggestions = [...suggestions];
        }
      }
    }
    // console.log(suggestions);
    loading = false;
  }

  onMount(async () => {
    await resolveSuggestion();
  });
</script>

<div class="text-2xl font-normal mt-10  ">
  {#each suggestions as { text, isModified, isAccepted, suggestion }}
    <span
      class={`${
        isModified && isAccepted
          ? "underline-offset-1 underline decoration-blue-500"
          : isModified && !isAccepted
          ? "underline-offset-1 underline decoration-red-400"
          : ""
      }`}
    >
      {#if isAccepted}
        {suggestion}
        {#if suggestion && suggestion[suggestion.length - 1].match(/^[0-9a-z]+$/)}
          .
        {/if}
      {:else}
        {text}
        {#if text && text[text.length - 1].match(/^[0-9a-z]+$/)}
          .
        {/if}
      {/if}
    </span>
  {/each}
  {#if loading}
    <div class="text-xs animate-pulse">Loading sentence...</div>
  {/if}
</div>
<div class="mt-10 font-bold opacity-60">Grammar Checks</div>

<div class="grid grid-cols-11 gap-2 gap-y-20 mt-4 place-items-center">
  {#if suggestions && suggestions.every((suggestion) => suggestion.isModified === false)}
    <div class="mt-4 col-span-10 place-self-start">All looks good!</div>
  {:else}
    {#if loading}
      <div class="animate-pulse col-span-11">
        Grammar checking in progress...
      </div>
    {/if}
    {#each suggestions as suggestion}
      {#if suggestion.isModified}
        <div class=" col-span-5 place-self-start">
          {suggestion.text}
        </div>
        <div class="mx-auto">
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
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>

        <div class=" col-span-5 flex flex-col gap-3">
          <div>
            {suggestion.suggestion}
          </div>

          {#if suggestion.isAccepted}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={() => {
                sentences[suggestion.index] = suggestion.text;
                suggestion.isAccepted = false;
              }}
              class=" btn btn-outline btn-xs flex gap-3 w-fit hover:bg-yellow-300  hover:text-black"
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>

              <div>Revert Changes</div>
            </div>
          {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={() => {
                console.log(suggestion.index);
                sentences[suggestion.index] = suggestion.suggestion;
                suggestion.isAccepted = true;
                //   suggestion.isModified = true;
                console.log(sentences);
              }}
              class=" btn btn-outline btn-xs flex gap-3 w-fit hover:bg-yellow-300  hover:text-black"
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <div>Accept Changes</div>
            </div>
          {/if}
        </div>
      {/if}
    {/each}
  {/if}
</div>

<div class="flex justify-between items-center  mt-10">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => (step -= 1)}
    class=" items-center gap-3 btn btn-outline  rounded-full"
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

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    on:click={() => {
      script = sentences.join(" ");
      step += 1;
    }}
    class=" w-fit bg-yellow-400  items-center gap-3 btn border-0 text-black hover:text-white ml-auto rounded-full"
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
