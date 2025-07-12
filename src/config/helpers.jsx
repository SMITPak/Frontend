import { addCart } from "../Redux/countCart";

export function SaveToLocal(id, dispatch){
  let carts = JSON.parse(localStorage.getItem("Cart"));
  if (carts) {
    const find = carts.findIndex((v) => v.id == id);
    if (find == -1) carts = [...carts, { id, count: 1 }];
    else console.log("Already added");
  } else {
    carts = [
      {
        id,
        count: 1,
      },
    ];
  }
  dispatch(addCart());
  localStorage.setItem("Cart", JSON.stringify(carts));
};
