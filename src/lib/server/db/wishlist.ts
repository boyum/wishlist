import { getCollection } from "$lib/server/firebase";
import type { FirestoreDataConverter } from "firebase-admin/firestore";

const COLLECTION_NAME = "wishlists";
const SLUG_LENGTH = 8;

type WishListItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  price: number;
  reserved: boolean;
};

export type Wishlist = {
  id: string;
  slug: string;
  title: string;
  items: WishListItem[];
  theme: "green" | "christmas";
};

type NewWishlist = Omit<Wishlist, "id" | "slug"> & { slug?: string };

const wishlistConverter: FirestoreDataConverter<Wishlist> = {
  toFirestore: (wishlist: Wishlist): Wishlist => wishlist,
  fromFirestore: (snapshot): Wishlist => {
    const data = snapshot.data();

    return {
      id: snapshot.id,
      title: data.title,
      items: data.items,
      slug: data.slug,
      theme: data.theme,
    };
  },
};

function getWishlistCollection() {
  return getCollection<Wishlist>(COLLECTION_NAME).withConverter(
    wishlistConverter,
  );
}

function getRandomArrayValue<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRandomSlug(): string {
  const supportedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

  let slug = "";
  for (let i = 0; i < SLUG_LENGTH; i++) {
    slug += getRandomArrayValue(supportedChars);
  }

  return slug;
}

/**
 * Retrieves a wishlist from the database.
 *
 * @param id A unique identifier for the wishlist.
 * @returns
 */
export async function getWishlist(id: string): Promise<Wishlist | undefined> {
  const wishlistCollection = getWishlistCollection();

  const wishlistRef = wishlistCollection
    .doc(id)
    .withConverter(wishlistConverter);

  const wishlistSnap = await wishlistRef.get();

  if (!wishlistSnap.exists) {
    return;
  }

  const data = wishlistSnap.data();
  return data;
}

type CreateWishlistError = {
  error: string;
};

/**
 * Creates a new wishlist in the database.
 * Will generate a random ID for the wishlist.
 * If a slug is not provided, a random 8 char slug will be generated.
 *
 * @param wishlist
 */
export async function createWishlist(
  wishlist: NewWishlist,
): Promise<Wishlist | CreateWishlistError> {
  const id = crypto.randomUUID();
  const slug = wishlist.slug || createRandomSlug();

  const wishlistCollection = getWishlistCollection();

  try {
    const wishlistWithId: Wishlist = {
      ...wishlist,
      id,
      slug,
    };

    const response = await wishlistCollection.add(wishlistWithId);
    const createdWishlist = (await response.get()).data();

    return createdWishlist ?? { error: "Wishlist not found" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    console.error(
      `Error creating wishlist '${JSON.stringify(wishlist, null, 2)}'`,
      error,
    );

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: error as any,
    };
  }
}

type UpdateWishlistError = {
  error: string;
};

/**
 * Updates a wishlist in the database.
 *
 * @param wishlist
 */
export async function updateWishlist(
  wishlist: Wishlist,
): Promise<UpdateWishlistError | undefined> {
  const wishlistCollection = getWishlistCollection();

  try {
    await wishlistCollection.doc(wishlist.id).update(wishlist);

    return;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    console.error(
      `Error updating wishlist '${JSON.stringify(wishlist, null, 2)}'`,
      error,
    );

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: error as any,
    };
  }
}
