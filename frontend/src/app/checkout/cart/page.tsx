"use client";

import useFromStore from "@/app/hooks/useFromStore";
import { ProductCartItem, useCartStore } from "@/app/store/useCartStore";
import { currencyFormat } from "@/app/utils/product.helper";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default async function ProductRoute() {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);
  const [cartItems, setCartItems] = useState<ProductCartItem[]>(cart ?? []);
  const [selectedItems, setselectedItems] = useState<ProductCartItem[]>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  const productsToPrice = (items: ProductCartItem[]) =>
    items.reduce(
      (totalPrice, item) =>
        totalPrice + (item.quantity ?? 0) * item.product.attributes.price,
      0
    );

  const increaseOneProductItem = (item: ProductCartItem) => {
    if (!cartItems) return;
    const cartItem = cartItems.find((i) => i.product.id === item.product.id);
    if (!cartItem) return;
    const updatedCart = cartItems.map((i) =>
      i.product.id === item.product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setCartItems(updatedCart);
    updateCart(updatedCart);
  };

  const decreaseOneProductItem = (item: ProductCartItem) => {
    if (!cartItems) return;
    const cartItem = cartItems.find((i) => i.product.id === item.product.id);
    if (cartItem) {
      let updatedCart: ProductCartItem[];
      const quantity = cartItem.quantity - 1;
      if (quantity > 0) {
        updatedCart = cartItems.map((i) =>
          i.product.id === item.product.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      } else {
        updatedCart = cartItems.filter((i) => i.product.id !== item.product.id);
      }
      setCartItems(updatedCart);
      updateCart(updatedCart);
    }
  };

  const removeItemFromCart = (item: ProductCartItem) => {
    if (!cartItems) return;
    const cartItem = cartItems.find((i) => i.product.id === item.product.id);
    if (!cartItem)
      throw new Error("Item not found: " + item.product.attributes.name);
    const updatedCart = cartItems.filter(
      (i) => i.product.id !== item.product.id
    );
    setCartItems(updatedCart);
    updateCart(updatedCart);
  };

  useEffect(() => {
    if (cart) {
      setCartItems(cart);
    }
  }, [cart]);

  useEffect(() => {
    const selectedCartItems = cartItems.filter((item) => item.selected);
    setselectedItems(selectedCartItems);
  }, [cartItems]);

  useEffect(() => {
    setTotalPrice(productsToPrice(selectedItems));
  }, [selectedItems]);

  const toggleAllItems = (checked: boolean) => {
    if (!cartItems?.length) return;
    setSelectAll(!!checked);
    const updatedCart = cartItems.map((product) => ({
      ...product,
      selected: checked,
    }));
    setCartItems(updatedCart);
  };

  const handleClickItem = (item: ProductCartItem, checked: boolean) => {
    item.selected = checked;
    const items = checked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => i.product.id !== item.product.id);
    setselectedItems(items);
    setSelectAll(cartItems?.length === items.length);
  };

  return (
    <div className="lg:ml-4 lg:mx-4 mt-4">
      <div className="text-xl font-medium mb-4">GIỎ HÀNG</div>
      <section className="flex gap-4 text-sm">
        {/* content */}
        <div className="h-full grow md:flex md:flex-col gap-4">
          <div className="bg-white p-4 rounded-lg grid grid-cols-6 grid-flow-col gap-4">
            <div className="flex gap-2 col-span-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={selectAll}
                onChange={(event) => toggleAllItems(event.target.checked)}
              />
              <div>Tất cả</div>
            </div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
            <span className="text-center">
              <DeleteOutlined className="cursor-pointer" rev={undefined} />
            </span>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-white p-4 rounded-lg grid grid-cols-6 grid-flow-col gap-4 align-center"
            >
              <div className="flex gap-2 align-center col-span-2">
                <input
                  className="cursor-pointer leading-5"
                  type="checkbox"
                  checked={!!item.selected}
                  onChange={(event) =>
                    handleClickItem(item, event.target.checked)
                  }
                />
                <div>{item.product.attributes.name}</div>
              </div>
              <div>{currencyFormat(item.product.attributes.price)}</div>
              <div className="flex gap-1">
                <button
                  className="border rounded-lg px-3 py-1"
                  onClick={() => decreaseOneProductItem(item)}
                >
                  -
                </button>
                <button className="border rounded-lg px-4 py-1">
                  {item.quantity}
                </button>
                <button
                  className="border rounded-lg px-3 py-1"
                  onClick={() => increaseOneProductItem(item)}
                >
                  +
                </button>
              </div>
              <div>
                {item.quantity > 0 &&
                  currencyFormat(item.product.attributes.price * item.quantity)}
              </div>
              <span className="text-center">
                <DeleteOutlined
                  className="cursor-pointer"
                  rev={undefined}
                  onClick={() => removeItemFromCart(item)}
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
