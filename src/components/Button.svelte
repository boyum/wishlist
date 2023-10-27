<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const handleClick = (event: MouseEvent) => {
    dispatch("click", event);
  };
</script>

<button on:click={handleClick}><slot /></button>

<style lang="scss" scoped>
  button {
    align-items: center;
    background-color: #fff;
    border: none;
    border-bottom: 0.25rem solid #86a789;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    padding: 1rem 1.5rem;
    transition: transform 0.15s ease-in-out;

    &:active {
      border-bottom: none;
      margin-top: 0.25rem;
      transform: translateY(0.25rem);
    }
  }
</style>
