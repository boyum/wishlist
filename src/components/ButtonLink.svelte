<script lang="ts">
  export let href: string;
  export let className: string = "";
</script>

<a {href} class={className}><slot /></a>

<style lang="scss" scoped>
  a {
    align-items: center;
    background-color: #fff;
    border: none;
    border-bottom: 0.25rem solid #86a789;
    border-radius: 0.5rem;
    color: black;
    cursor: pointer;
    display: flex;
    gap: 0.25rem;
    padding: 1rem 1.5rem;
    text-decoration: none;
    transition: transform 0.15s ease-in-out;

    &:active {
      border-bottom: none;
      margin-top: 0.25rem;
      transform: translateY(0.25rem);
    }
  }
</style>
