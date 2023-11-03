<script lang="ts">
  import { enhance } from "$app/forms";
  import { exampleWishes } from "$lib/constants/example-wishes";
  import type { Wishlist } from "$lib/server/db/wishlist";
  import { getRandomValue } from "$lib/utils/array/get-random-value";
  import { capitalize } from "$lib/utils/string/capitalize";
  import { fade } from "svelte/transition";
  import Button from "../../components/Button.svelte";
  import Input from "../../components/Input.svelte";
  import Textarea from "../../components/Textarea.svelte";
  import PaletteIcon from "../../icons/Palette.svelte";
  import PlusIcon from "../../icons/Plus.svelte";

  type WishlistField = keyof Wishlist;
  type UUID = ReturnType<typeof crypto.randomUUID>;

  const titleName: WishlistField = "title";

  const initialNumberOfWishes = 1;
  let wishes = Array.from({ length: initialNumberOfWishes }, () => ({
    id: crypto.randomUUID(),
  }));

  function getRandomExampleWish() {
    return capitalize(getRandomValue(exampleWishes));
  }

  function addWish() {
    wishes = [...wishes, { id: crypto.randomUUID() }];
  }

  function removeWish(id: UUID) {
    wishes = wishes.filter((wish) => wish.id !== id);
  }
</script>

<section>
  <h1>Create your new list</h1>

  <form
    method="POST"
    use:enhance={({ formElement }) => {
      // TODO: Start loading animation on button
      // TODO: Copy the wishlist link to the clipboard
      return async ({ result }) => {
        // TODO: Stop loading animation on button
        formElement.reset();
      };
    }}
  >
    <Textarea
      label="Listenavn"
      placeholder="Sindres ønskeliste"
      name={titleName}
    />

    <Button><PaletteIcon /> Velg tema</Button>

    Ønsker

    {#each wishes as wish, i (wish.id)}
      <div in:fade={{ duration: 200 }}>
        <div />
        <Textarea
          label="Ønske {i + 1}"
          placeholder={getRandomExampleWish()}
          name="wish-{i}-title"
          on:mount={(event) => {
            event.detail.focus();
          }}
        />

        <Textarea
          label="Beskrivelse"
          placeholder={getRandomExampleWish()}
          name="wish-{i}-description"
        />

        <Input
          label="Link"
          placeholder="https://www.amazon.com/..."
          name="wish-{i}-url"
        />

        <Button type="button" on:click={() => removeWish(wish.id)}>
          Remove
        </Button>
      </div>
    {/each}

    <Button on:click={() => addWish()}>
      <PlusIcon /> Nytt ønske
    </Button>

    <Button type="submit">Lagre listen</Button>
  </form>
</section>
