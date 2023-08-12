<script lang="ts">
  import Card, {
    Content,
    PrimaryAction,
    Actions,
    ActionButtons,
    ActionIcons,
  } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import IconButton, { Icon } from "@smui/icon-button";
  import { onMount } from 'svelte';  

  let message = '';

  onMount(async () => {
        const response = await fetch('http://localhost:3001/api/hello');
        const data = await response.json();
        message = data.message;
    });
</script>

<div>
  <h2>Latest Stock News</h2>
  <div class="card-container">
  <Card padded>{message}.</Card>
  </div>
</div>

