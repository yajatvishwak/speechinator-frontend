<script>
  import ScriptLane from "./ScriptLane.svelte";

  export let params = {};
  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";
  import axios from "axios";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  let data = {
    scriptname: "234",
    vidurl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    script: `He scolded himself for being so tentative. He knew he shouldn't be so cautious, but there was a sixth sense telling him that things weren't exactly as they appeared. It was that weird chill that rolls up your neck and makes the hair stand on end. He knew that being so tentative could end up costing him the job, but he learned that listening to his sixth sense usually kept him from getting into a lot of trouble.
    `,
    transcribedScript: `He scolded him for being so tentative. He knew he shouldn't be so cautious, but there was a sixth sense telling him that things weren't exactly as they appeared. It was that weird chill that rolls up your neck and makes the hash stand on end. He knew that being so tentative would end up costing him his job, but learnt that listening into his sixth sense usually kept him from getting into a lot of trouble.
    `,
    analytics: {
      wpm: 56,
      pauses: 34,
      speechpercent: 34,
      tone: "Showing no emotions",
      redundancy: {
        word: ["loolll1", "asdasd"],
      },
    },
    pastdata: {
      wpm: [34, 23, 24],
      pauses: [42, 53, 34],
      speechpercent: [12, 42, 53],
    },
  };
  let chartData = {};

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );
  let loading = false;
  onMount(async () => {
    loading = true;
    const res = await axios.post("http://localhost:5000/get-take", {
      practiceid: params.id,
    });
    data = res.data.take;
    loading = false;
    chartData = {
      labels: data.pastdata.wpm.map((item, index) => index + 1),
      datasets: [
        {
          label: "Speech pace",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(225, 204,230)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.pastdata.wpm,
        },
        {
          label: "Pauses/Fillers",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(0, 0, 210, .3)",
          borderColor: "rgb(0, 0, 210)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(0, 0, 210)",
          pointBackgroundColor: "rgb(0, 0, 210)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.pastdata.pauses,
        },
        {
          label: "Speech Percent",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 255, 0, .3)",
          borderColor: "rgb(255, 255, 0)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(255, 255, 0)",
          pointBackgroundColor: "rgb(255, 255, 0)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.pastdata.speechpercent,
        },
      ],
    };
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
      on:click={() => push("/alltakes")}
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
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      <div>Home</div>
    </div>
  </div>
  <div class="divider" />

  <div class="">
    <div class="opacity-50 text-xl">Take analysis</div>
    {#if loading}
      <div class="flex flex-col h-screen">
        <div class="animate-pulse">Loading...</div>
      </div>
    {:else}
      <div class="grid md:grid-cols-2 gap-6 mt-4">
        <div class="flex flex-col gap-3">
          <div class="text-yellow-600 dark:text-yellow-500">
            Your Take video
          </div>
          <div class="flex  rounded-2xl justify-center items-center border-2">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video controls class=" w-full h-full rounded-xl">
              <source
                src={"http://localhost:5000/sendvid/video/" + data.vidurl}
              /></video
            >
          </div>
          <div class="btn">View Transcribed Script</div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="text-yellow-600 dark:text-yellow-500">
            Your script (uploaded script)
          </div>
          <div class="max-h-[45vh] overflow-auto pr-5">{data.script}</div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="text-yellow-600 dark:text-yellow-500">Analysis</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <div
              class=" bg-slate-200 dark:bg-slate-700 p-3 px-5 rounded-lg flex items-center justify-between"
            >
              <div>
                <div class="text-2xl">{data.analytics.wpm} WPM</div>
                <div class="opacity-50 font-medium">Speech pace</div>
              </div>
              <img src="speed.png" class="w-10" alt="" />
            </div>
            <div
              class=" bg-slate-200 dark:bg-slate-700 p-3 px-5 rounded-lg flex items-center justify-between"
            >
              <div>
                <div class="text-2xl">{data.analytics.pauses} Pauses</div>
                <div class="opacity-50 font-medium ">Pauses/Fillers</div>
              </div>
              <img src="pause.png" class="w-10" alt="" />
            </div>
            <div
              class=" bg-slate-200 dark:bg-slate-700 p-3 px-5 rounded-lg flex items-center justify-between"
            >
              <div>
                <div class="text-2xl">
                  {data.analytics.speechpercent.toFixed(2)} %
                </div>
                <div class="opacity-50 font-medium">Actual Speech</div>
              </div>
              <img src="mic.png" class="w-10" alt="" />
            </div>
            <div
              class=" bg-slate-200 dark:bg-slate-700 p-3 px-5 rounded-lg flex items-center justify-between"
            >
              <div>
                <div class="text-2xl">{data.analytics.tone}</div>
                <div class="opacity-50 font-medium">Speech Tone</div>
              </div>
              <img src="tone.png" class="w-10" alt="" />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-yellow-600 dark:text-yellow-500">Redundancy</div>
          <div class="opacity-50">
            Use of a synonym in your script enhaces the way it sounds. After
            analysing your script and take video we found the following words
            were repeated often. You may want to include the following synonyms
            in your script.
          </div>
          <div class="flex flex-col mt-3">
            <div class=" flex items-center gap-4">
              <div>word</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
              <div>word, item, not a word</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col col-span-2">
          <div class="text-yellow-600 dark:text-yellow-500">Script Lane</div>
          <ScriptLane
            bind:script={data.script}
            bind:transcribedScript={data.transcribedScript}
          />
        </div>
        <div class="md:col-span-2 ">
          <div class="text-yellow-600 dark:text-yellow-500">
            Past Sessions Progress
          </div>
          <div class="w-full mt-7">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
