import { createWishlist } from "$lib/server/db/wishlist";

export const actions = {
  default: async ({ request }) => {
    // https://kit.svelte.dev/docs/form-actions

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // TODO: Validate data (with Zod?)
    if (!data.title) {
      throw new TypeError("Title is required");
    }

    const createdWishlist = await createWishlist({
      title: data.title as string,
      items: [],
      theme: "green",
    });

    // const wishlist = await create(data as unknown as Wishlist);
    return createdWishlist;
  },
};
