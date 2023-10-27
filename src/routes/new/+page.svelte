<script>
  import Textarea from "../../components/Textarea.svelte";
  import Button from "../../components/Button.svelte";
  import PaletteIcon from "../../icons/Palette.svelte";
  import PlusIcon from "../../icons/Plus.svelte";
</script>

<section>
  <h1>Create your new list</h1>

  <Textarea label="Listenavn" placeholder="Sindres ønskeliste" />

  <Button><PaletteIcon /> Velg tema</Button>

  <Button><PlusIcon /> Nytt ønske</Button>
</section>
