<script lang="ts">
  import { enhance } from "$app/forms";
  import type { Wishlist } from "$lib/server/db/wishlist";
  import Button from "../../components/Button.svelte";
  import Textarea from "../../components/Textarea.svelte";
  import PaletteIcon from "../../icons/Palette.svelte";
  import PlusIcon from "../../icons/Plus.svelte";

  type WishlistField = keyof Wishlist;
  const titleName: WishlistField = "title";
</script>

<section>
  <h1>Create your new list</h1>

  <form
    method="POST"
    use:enhance={({ formElement }) => {
      // TODO: Show loading animation on button
      // TODO: Copy the wishlist link to the clipboard
      return async ({ result }) => {
        // TODO: Stop loading animation on button
      };
    }}
  >
    <Textarea
      name={titleName}
      label="Listenavn"
      placeholder="Sindres ønskeliste"
    />

    <Button><PaletteIcon /> Velg tema</Button>

    <Button><PlusIcon /> Nytt ønske</Button>

    <Button type="submit">Save your list</Button>
  </form>
</section>
