<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type: "button" | "submit" = "button";

  const dispatch = createEventDispatcher();

  const handleClick = (event: MouseEvent) => {
    dispatch("click", event);
  };
</script>

<button on:click={handleClick} {type}>
  <div class="inner">
    <slot />
  </div>
</button>

<style lang="scss" scoped>
  button {
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: block;
    font-size: inherit;
    margin-bottom: 1rem;
    padding: 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.15s ease-in-out;
    user-select: none;

    &:hover,
    &:focus {
      .inner {
        transform: translate3d(-0.175rem, -0.35rem, 0);
        transition-duration: 0.15s;
      }
    }

    &:active {
      .inner {
        transform: translate3d(-0.025rem, -0.1rem, 0);
        transition-duration: 0.1s;
      }
    }

    &::before {
      background-color: #86a789;
      border-radius: inherit;
      content: "";
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  .inner {
    align-items: center;
    background-color: #fff;
    border-radius: inherit;
    display: flex;
    gap: 0.25rem;
    padding: 1rem 1.5rem;
    position: relative;
    transform: translate3d(-0.125rem, -0.25rem, 0);
    transition: transform 0.25s ease-in-out;
  }
</style>
