import { db, getCollection } from "$lib/server/firebase";
import {
  doc,
  getDoc,
  setDoc,
  type FirestoreDataConverter,
  addDoc,
} from "firebase/firestore";

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

type Wishlist = {
  id: string;
  slug: string;
  title: string;
  description: string;
  items: WishListItem[];
};

type NewWishlist = Omit<Wishlist, "id" | "slug"> & { slug?: string };

const wishlistConverter: FirestoreDataConverter<Wishlist, Wishlist> = {
  toFirestore: (wishlist: Wishlist): Wishlist => wishlist,
  fromFirestore: (snapshot, options): Wishlist => {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      items: data.items,
      slug: data.slug,
    };
  },
};

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
export async function get(id: string): Promise<Wishlist | null> {
  const wishlistRef = doc(db, COLLECTION_NAME, id).withConverter(
    wishlistConverter,
  );

  const wishlistSnap = await getDoc(wishlistRef);

  if (!wishlistSnap.exists()) {
    return null;
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
export async function create(
  wishlist: NewWishlist,
): Promise<Wishlist | CreateWishlistError> {
  const id = crypto.randomUUID();
  const slug = wishlist.slug || createRandomSlug();

  const wishlistCollection = getCollection(COLLECTION_NAME);

  try {
    (wishlist as Wishlist).id = id;
    (wishlist as Wishlist).slug = slug;

    await addDoc(wishlistCollection, wishlist);

    return wishlist as Wishlist;
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
export async function update(
  wishlist: Wishlist,
): Promise<Wishlist | UpdateWishlistError> {
  const wishlistRef = doc(db, COLLECTION_NAME, wishlist.id).withConverter(
    wishlistConverter,
  );

  try {
    await setDoc(wishlistRef, wishlist);
    return wishlist;
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
