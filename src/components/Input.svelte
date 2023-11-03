<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string = "";
  export let type: "text" | "email" | "number" = "text";

  const inputmodeMap = {
    text: "text",
    email: "email",
    number: "numeric",
  } as const;

  $: inputmode = inputmodeMap[type];

  const id = crypto.randomUUID();
</script>

<label for={id}>{label}</label>
<input {id} {name} {placeholder} {type} {inputmode} />

<style lang="scss" scoped>
  label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  input {
    border: none;
    border-bottom: 0.25rem solid #86a789;
    border-radius: 0.5rem;
    display: block;
    font-family: inherit;
    font-size: 1.5rem;
    line-height: 2rem;
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;
  }
</style>
