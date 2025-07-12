import { useSelector } from "react-redux";
import { CartCard } from "../../Components/Card/cart";
import { useEffect, useState } from "react";
import apiRequest from "../../config/api";
import Loader from "../../Components/SubComponents/loader";

export default function Cart() {
  const { cartData, value } = useSelector((state) => state.count);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = cartData?.map((v) => `_id=${v.id}`);
  params.push(`&limit=${value}`);
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
    HandleApi();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 border-2 border-gray-300 rounded-lg p-4">
        <div className="flex flex-wrap gap-4">
          {products.map((v) => (
            <CartCard
              id={v._id}
              title={v.title}
              description={v.description}
              img={v.images[0]}
              price={v.price}
              discPerc={v.discountPercentage}
              rating={Math.ceil(v.rating)}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 border-2 border-gray-300 rounded-lg p-4"></div>
    </div>
  );
}
