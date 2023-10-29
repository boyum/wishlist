<script lang="ts">
  export let name: string;
  export let label: string;
  export let placeholder: string = "";

  const handleInput = (event: Event) => {
    const textarea = event.target as HTMLInputElement;
    if (textarea.parentNode) {
      (textarea.parentNode as HTMLElement).setAttribute(
        "data-replicated-value",
        textarea.value,
      );
    }
  };
</script>

<label for="list-name">{label}</label>
<div class="grow-wrap">
  <textarea id="list-name" {name} {placeholder} on:input={handleInput} />
</div>

<style lang="scss" scoped>
  /* Trick to get autogrowing textarea from https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
  .grow-wrap {
    /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
    display: grid;
  }
  .grow-wrap::after {
    /* Note the weird space! Needed to preventy jumpy behavior */
    content: attr(data-replicated-value) " ";

    /* This is how textarea text behaves */
    white-space: pre-wrap;

    /* Hidden from view, clicks, and screen readers */
    visibility: hidden;
  }
  .grow-wrap > textarea {
    /* You could leave this, but after a user resizes, then it ruins the auto sizing */
    resize: none;

    /* Firefox shows scrollbar on growth, you can hide like this. */
    overflow: hidden;
  }
  .grow-wrap > textarea,
  .grow-wrap::after {
    /* Identical styling required!! */
    border: none;
    border-bottom: 0.25rem solid #86a789;
    border-radius: 0.5rem;
    display: block;
    font-size: 1.5rem;
    font-family: inherit;
    line-height: 2rem;
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;
    resize: none;

    /* Place on top of each other */
    grid-area: 1 / 1 / 2 / 2;
  }

  label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
</style>
