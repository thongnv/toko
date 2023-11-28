"use client";

import useFromStore from "@/app/hooks/useFromStore";
import { useCartStore } from "@/app/store/useCartStore";
import { currencyFormat } from "@/app/utils/product.helper";
import { DeleteOutlined } from "@ant-design/icons";

export default async function ProductRoute() {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const totalPrice = useFromStore(useCartStore, (state) => state.totalPrice);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeOneFromCart = useCartStore((state) => state.removeOneFromCart);

  return (
    <div className="lg:ml-4 lg:mx-4 mt-4">
      <div className="text-xl font-medium mb-4">GIỎ HÀNG</div>
      <section className="flex gap-4 text-sm">
        {/* content */}
        <div className="h-full grow md:flex md:flex-col gap-4">
          <div className="bg-white p-4 rounded-lg grid grid-cols-6 grid-flow-col gap-4">
            <div className="flex gap-2 col-span-2">
              <input className="cursor-pointer" type="checkbox" />
              <div>Tất cả</div>
            </div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
            <span className="text-center">
              <DeleteOutlined className="cursor-pointer" rev={undefined} />
            </span>
          </div>
          {cart?.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg grid grid-cols-6 grid-flow-col gap-4 align-center"
            >
              <div className="flex gap-2 align-center col-span-2">
                <input className="cursor-pointer leading-5" type="checkbox" />
                <div>{product.attributes.name}</div>
              </div>
              <div>{currencyFormat(product.attributes.price)}</div>
              <div className="flex gap-1">
                <button
                  className="border rounded-lg px-3 py-1"
                  onClick={() => removeOneFromCart(product)}
                >
                  -
                </button>
                <button className="border rounded-lg px-4 py-1">
                  {product.quantity}
                </button>
                <button
                  className="border rounded-lg px-3 py-1"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>
              <div>
                {product.quantity &&
                  currencyFormat(product.attributes.price * product.quantity)}
              </div>
              <span className="text-center">
                <DeleteOutlined
                  className="cursor-pointer"
                  rev={undefined}
                  onClick={() => removeFromCart(product)}
                />
              </span>
            </div>
          ))}
        </div>

        {/* cart */}
        <div className="h-full w-80 lg:block">
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="mb-4">Giao tới</div>
            <div className="flex gap-2 text-sm font-bold mb-2">
              <div>James Matcher</div>
              <div className="border-solid border-l border-violet-200 h-5"></div>
              <div>0987654321</div>
            </div>
            <div className="text-gray-400">
              5 Parvis Alan Turing, 75013 París
            </div>
          </div>
          <div className="bg-white rounded-lg divide-y">
            <div className="flex gap-2 text-sm justify-between p-4">
              <div>Tạm tính</div>
              <div>{currencyFormat(totalPrice || 0)}</div>
            </div>
            <div className="flex gap-2 text-sm justify-between p-4">
              <div>Tổng tiền</div>
              <div className="text-red-500 text-xl">
                {currencyFormat(totalPrice || 0)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
