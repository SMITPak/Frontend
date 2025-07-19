import { useDispatch, useSelector } from "react-redux";
import { CartCard } from "../../Components/Card/cart";
import { useCallback, useEffect, useState } from "react";
import apiRequest from "../../config/api";
import Loader from "../../Components/SubComponents/loader";
import { openModal } from "../../Redux/countCart";
import { useNavigate } from "react-router";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartData, value } = useSelector((state) => state.count);
  const { user } = useSelector((s) => s.reducer.auth);
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = cartData?.map((v) => `_id=${v.id}`);
  params && params.push(`&limit=${value}`);
  const HandleApi = async () => {
    apiRequest({
      endpoint: `/products?${params.join("&")}`,
      setLoading: setIsLoading,
      onSuccess: (data) => {
        setProducts(data.products);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  useEffect(() => {
    if (params && params?.length > 1) {
      HandleApi();
    }
  }, [cartData]);

  const total = products.reduce((v, c) => {
    return Math.round(c.price - c.price / c.discountPercentage) + v;
  }, 0);
  const handlePay = () => {
    if (user) {
      apiRequest({
        endpoint: `/order`,
        method: "post",
        setLoading: setIsLoading,
        data: {
          totalPrice: total,
          productsDetails: cartData,
        },
        onSuccess: (data) => {
          setOrderId(data.orderId);
          localStorage.removeItem('Cart')
          navigate('/')
        },
        onError: (err) => {
          console.log(err);
        },
      });
    } else {
      dispatch(openModal(true));
    }
  };
  return (
    <div className="grid lg:grid-cols-4 items-start gap-4 my-10 mx-4">
      <div className="lg:col-span-3 order-2 lg:order-1 border-2 border-gray-300 rounded-lg p-4">
        <div className="flex justify-center flex-wrap gap-4">
          {products?.length > 0 ? (
            products.map((v) => (
              <CartCard
                id={v._id}
                title={v.title}
                description={v.description}
                img={v.images[0]}
                price={v.price}
                discPerc={v.discountPercentage}
                rating={Math.ceil(v.rating)}
              />
            ))
          ) : (
            <p className="text-center">Please do some shopping</p>
          )}
        </div>
      </div>
      <div className="col-span-1  order-1 border-2 border-gray-300 rounded-lg p-4">
        {products?.length > 0 &&
          products.map((v) => (
            <p className="text-sm flex">
              <span className="grow">{v.title}:</span>
              <span>
                ${Math.round(v.price - v.price / v.discountPercentage)}
              </span>
            </p>
          ))}
        <hr className="my-2" />
        <p className="text-sm flex">
          <span className="grow">Total:</span>
          <span>${total}</span>
        </p>
        <button
          onClick={handlePay}
          className="rounded-lg w-full mt-6 bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Pay now
        </button>
      </div>
    </div>
  );
}
