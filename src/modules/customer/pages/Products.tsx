import { useGetData } from "@/hooks/useGetData";
import { setCartItems } from "@/store/reducers/cartReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import dammyProduct from "@/assets/product.webp";
import Loading from "@/components/Loading";

const Products = () => {
  // ------------- hooks -------------
  const navigate = useNavigate();
  const { categoryId, userId } = useParams();
  const { data, isLoading } = useGetData(
    `/customer/product/${categoryId}?userId=${userId}`,
    `restaurantProducts-${categoryId}`
  );
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const [itemIDs, setItemIDs] = useState<any>([]);

  return (
    <div
      style={{
        backgroundColor: "#0b7180",
        height: "100%",
      }}
    >
      <div className="">s</div>

      <div className="min-h-96 rounded-xl bg-white mx-12 mt-16">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-row flex-wrap justify-start gap-5 p-5 ">
            {data?.data?.map((item: any) => (
              <div
                key={item?._id}
                className="card card-compact w-80 bg-base-100 shadow-md hover:shadow-2xl cursor-pointer border border-gray  hover:bg-cardBg hover:text-white"
              >
                <div>
                  <figure>
                    <img
                      src={item?.image?.length ? item?.image : dammyProduct}
                      alt="Food"
                      className="h-60 border border-lightGray cover w-full"
                    />
                  </figure>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{item?.name}</h2>
                  <p className="text-lg">{item?.description}</p>
                  <div className=" flex flex-row justify-between items-center">
                    <div>
                      {!itemIDs?.includes(item?._id) ? (
                        <button
                          className="btn btn-neutral w-fit"
                          onClick={() => {
                            dispatch(
                              setCartItems([
                                ...cartItems,
                                { ...item, quantity: 1 },
                              ])
                            );
                            setItemIDs((prev: any) => [...prev, item?._id]);
                          }}
                        >
                          Add to card
                        </button>
                      ) : (
                        <button
                          className="btn btn-success hover:bg-red-500 w-fit"
                          onClick={() => {
                            dispatch(
                              setCartItems(
                                cartItems?.filter(
                                  (item: any) => item?._id !== item?._id
                                )
                              )
                            );
                            setItemIDs((prev: any) =>
                              prev?.filter((i: any) => i !== item?._id)
                            );
                          }}
                        >
                          Added
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="font-bold">Price : {item?.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
