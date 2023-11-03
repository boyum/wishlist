import { createWishlist, type NewWishListItem } from "$lib/server/db/wishlist";
import { fail } from "@sveltejs/kit";

function getWishes(data: Record<string, string>): NewWishListItem[] {
  const wishKeys = Object.keys(data).filter((key) => key.startsWith("wish-"));
  const numberOfWishes = new Set(wishKeys.map((key) => key.split("-")[1])).size;

  const wishes: NewWishListItem[] = [];
  for (let i = 0; i < numberOfWishes; i++) {
    const wish: NewWishListItem = {
      title: data[`wish-${i}-title`],
      description: data[`wish-${i}-description`],
      url: data[`wish-${i}-url`],
      price: Number.parseFloat(data[`wish-${i}-price`]),
    };

    wishes.push(wish);
  }

  return wishes;
}

export const actions = {
  default: async ({ request }) => {
    // https://kit.svelte.dev/docs/form-actions

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // TODO: Validate data (with Zod?)
    if (!data.title) {
      const HTTP_UNPROCESSABLE_ENTITY = 422;
      fail(HTTP_UNPROCESSABLE_ENTITY, { error: "Title is required" });
      return;
    }

    // TODO: Validate wishes
    const wishes = getWishes(data as Record<string, string>);

    const createdWishlist = await createWishlist({
      title: data.title as string,
      items: wishes,
      theme: "green",
    });

    return createdWishlist;
  },
};
