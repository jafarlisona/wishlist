import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import Switcher from "../Switcher";

function Wishlist() {
  const [openRight, setOpenRight] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(
    localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : []
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(selected));
  }, [selected]);

  const openDrawerRight = () => {
    setOpenRight(true);
    document.body.classList.add("overflow-hidden");
  };

  const closeDrawerRight = () => {
    setOpenRight(false);
    document.body.classList.remove("overflow-hidden");
  };

  function addToWishlist(item) {
    const elemIndex = selected.findIndex((y) => y.id === item.id);
    if (elemIndex !== -1) {
      const newWishlist = [...selected];
      setSelected(newWishlist);
    } else {
      setSelected([...selected, { ...item }]);
    }
  }

  function removeFromWishlist(id) {
    setSelected(selected.filter((x) => x.id !== id));
  }
  return (
    <div>
      <div className="wishlist max-w-3xl mx-auto">
        <div className="flex flex-row-reverse gap-72 mx-auto my-3">
          <Switcher />
          <Button
            onClick={openDrawerRight}
            ripple={true}
            color="gray"
            className="bg-blue-gray-700 dark:bg-red-900"
          >
            Open Wishlist
          </Button>
        </div>
        <Drawer
          placement="right"
          open={openRight}
          onClose={closeDrawerRight}
          className="py-4 pl-4 bg-blue-gray-50 dark:bg-gray-700"
          size="400px"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography
              variant="h5"
              className="text-blue-gray-800 dark:text-black"
            >
              WISHLIST
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerRight}
              className="dark:text-black dark:focus:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className="wishlist-container flex flex-col gap-5 px-1 overflow-y-scroll h-[655px]">
            {selected.map((item) => (
              <Card
                className=" h-20 max-w-[48rem] flex-row relative dark:bg-gray-300"
                key={item.id}
              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-24 shrink-0 rounded-r-none"
                >
                  <img
                    src={item.image}
                    alt="card-image"
                    className="h-full w-full object-contain p-2"
                  />
                </CardHeader>
                <CardBody className="w-60 p-0 pl-2 ">
                  <Typography
                    variant="h6"
                    className="text-ellipsis truncate mb-5 mt-1 text-blue-gray-700 dark:text-red-900"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="gray"
                    className=" font-bold dark:text-black "
                  >
                    ${item.price}
                  </Typography>
                  <IconButton
                    variant="text"
                    size="sm"
                    className="!absolute bottom-1 right-1 hover:bg-red-50 dark:hover:bg-red-200 active:bg-red-200 rounded-full"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <i class="fa-regular fa-trash-can fa-lg text-red-900"></i>
                  </IconButton>
                </CardBody>
              </Card>
            ))}
          </div>
        </Drawer>
      </div>
      <div className="grid grid-cols-4 gap-y-8 max-w-screen-2xl mx-auto my-9">
        {products.map((x) => (
          <Card className="w-72 dark:bg-gray-300" key={x.id}>
            <CardHeader shadow={false} floated={false} className="h-52">
              <img
                src={x.image}
                alt="card-image"
                className="h-full w-full object-contain"
              />
              <IconButton
                size="lg"
                color="red"
                variant="text"
                className="!absolute top-4 right-4 rounded-full"
                onClick={() => addToWishlist(x)}
              >
                <i className="fas fa-heart" style={{ fontSize: "20px" }} />
              </IconButton>
            </CardHeader>
            <CardBody className="h-40">
              <div className="mb-2 flex items-center justify-between">
                <Typography
                  color="blue-gray"
                  className="font-bold text-clip truncate dark:text-red-900"
                >
                  {x.title}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium dark:text-black dark:font-bold"
                >
                  ${x.price}
                </Typography>
              </div>
              <Typography
                variant="small"
                size="sm"
                color="gray"
                className="font-normal opacity-75  text-clip truncate dark:text-gray-900"
              >
                {x.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-white dark:text-red-900"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Wishlist;
