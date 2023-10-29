import type { Wishlist } from "$lib/server/db/wishlist";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions = {
  default: async ({ request }) => {
    // https://kit.svelte.dev/docs/form-actions

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // TODO: Validate data

    console.log({ data });

    // Fake delay to simulate network latency
    // TODO: Remove this
    await sleep(2000);

    // const wishlist = await create(data as unknown as Wishlist);
    return data as unknown as Wishlist;
  },
};
