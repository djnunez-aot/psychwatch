<script lang="ts">
  import Card, {
    Content,
    PrimaryAction,
    Actions,
    ActionButtons,
    ActionIcons,
  } from '@smui/card';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
 
  let clicked = 0;
</script>

  <div class="card-container">
    <Card>
      <PrimaryAction on:click={() => clicked++} padded>
        Primary Action, a clickable area of the card.
      </PrimaryAction>
    </Card>
  </div>
 
 
<pre class="status">Clicked: {clicked}</pre>
 