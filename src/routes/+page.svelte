<script>
  import ButtonLink from "../components/ButtonLink.svelte";
  import PlusIcon from "../icons/Plus.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>Wishlist</h1>

  <ButtonLink href="/new"><PlusIcon /> Make your wishes come true ✨</ButtonLink
  >
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    text-align: center;
    width: 100%;
  }
</style>
