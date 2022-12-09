<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";

  export let script;
  export let step;
  export let scriptname;
  // export let sentences;
  let mediaRecorder = null;
  let media = [];
  let isRecording = false;
  let videoSource = null;
  let loading = false;

  const obtenerVideoCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoSource.srcObject = stream;
      videoSource.play();
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => media.push(e.data);
      mediaRecorder.onstop = function () {
        let vidBlob = new Blob(media, { type: "video/webm" });
        let video_local = URL.createObjectURL(
          new Blob(media, { type: "video/webm" })
        );
        console.log(video_local);
        // send to server
        let formData = new FormData();
        let filename = Date.now() + ".webm";
        formData.append("file", vidBlob, filename);
        console.log("HELLP: " + scriptname);
        formData.append(
          "data",
          JSON.stringify({
            script,
            scriptname,
          })
        );
        // formData.append("script", script);
        // formData.append("scriptname", scriptname);
        loading = true;
        axios
          .post("http://localhost:5000/processvideo", formData)
          .then(async (res) => {
            console.log(res.data);
            if (res.data.code === "success") {
              const res2 = await axios.post("http://localhost:5000/analysis", {
                practiceid: res.data.practiceid,
              });
              if (res2.data.message === "success") {
                push("/take/" + res.data.practiceid);
              }
            } else {
              alert("Something went wrong ");
            }
            loading = false;
          });
        media = [];
        // turn off all recording
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      };
    } catch (error) {
      console.log(error);
    }
  };
  async function stopRecording() {
    console.log(media);
    mediaRecorder.stop();
    isRecording = false;
  }
</script>

{#if loading}
  <div class="flex items-center justify-center h-full">
    <div class="animate-pulse">Processing....</div>
  </div>
{/if}

<div class="grid grid-cols-1 md:grid-cols-3  gap-5 mt-10 text-lg">
  <div class="max-h-[80vh] row-start-1 col-span-2 overflow-auto pr-6">
    {script}
  </div>

  <div class="flex flex-col gap-3">
    <div class="flex p-2 rounded-2xl bg-yellow-600 w-full">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        bind:this={videoSource}
        class="rounded-lg  "
        playsinline
        autoplay
        muted
      />
    </div>

    <div class="flex p-2">
      {#if isRecording}
        <div class="flex  gap-2 items-center justify-between w-full">
          <div class=" animate-pulse">🔴</div>
          <div class="text-red animate-pulse">Recording...</div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={stopRecording}
            class="btn rounded-full btn-outline btn-xs ml-auto"
          >
            Stop Recording
          </div>
        </div>
      {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={async () => {
            await obtenerVideoCamara();
            mediaRecorder.start(4000);
            // amediaRecorder.start(4000);
            isRecording = true;
          }}
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
