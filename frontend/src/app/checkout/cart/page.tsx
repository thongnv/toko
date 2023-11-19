"use client";

import useFromStore from "@/app/hooks/useFromStore";
import { useCartStore } from "@/app/store/useCartStore";

export default async function ProductRoute() {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc + product.attributes.price * (product.quantity as number),
      0
    );
  }

  return (
    <div className="lg:ml-4 lg:mx-4 mt-4">
      <div className="text-xl font-medium mb-4">GIỎ HÀNG</div>
      <section className="flex gap-4">
        {/* content */}
      <div className="h-full grow md:flex md:flex-col gap-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="text-sm font-bold">Màu</div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <div className="text-xl mb-2">Thông tin chi tiết</div>
          <ul>
          {cart?.map((product) => (
            <li key={product.id}>{product.attributes.name}</li>
          ))}
        </ul>
        </div>
      </div>
        
        {/* cart */}
        <div className="h-full w-full lg:w-64 lg:block bg-white rounded-lg p-4">
          <div className="mb-4">Tím, 128GB</div>
          <div className="text-sm font-bold mb-2">Số Lượng</div>
          <div className="flex gap-1 mb-4">
            <button className="border rounded-lg px-3 py-1">-</button>
            <button className="border rounded-lg px-4 py-1">1</button>
            <button className="border rounded-lg px-3 py-1">+</button>
          </div>
          <div className="text-sm font-bold mb-4">Tạm tính</div>
        </div>
      </section>
    </div>
  );
}
