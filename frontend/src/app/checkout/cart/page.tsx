"use client"

import useFromStore from "@/app/hooks/useFromStore";
import { useCartStore } from "@/app/store/useCartStore";
import { fetchAPI } from "@/app/utils/fetch-api";


async function fetchProductBySlug(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        url: filter,
      },
      populate: ["images"],
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function ProductRoute() {
  const cart = useFromStore(useCartStore, state => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce((acc, product) => acc + product.attributes.price * (product.quantity as number), 0)
  }
  
  return (
    <section>
      <h3 className="text-2xl font-bold mb-4">Shopping Cart</h3>
      <ul>
        {cart?.map(product => (
          <li key={product.id}>{product.attributes.name}</li>
        ))}
      </ul>
    </section>
  );
}

