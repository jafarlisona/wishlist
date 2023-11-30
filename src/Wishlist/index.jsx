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
function Wishlist() {
  const [openRight, setOpenRight] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  return (
    <div>
      <div className="wishlist max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-4">
          <Button onClick={openDrawerRight}>Open Drawer Right</Button>
        </div>
        <Drawer
          placement="right"
          open={openRight}
          onClose={closeDrawerRight}
          className="p-4"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Material Tailwind
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerRight}
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
          <Card className="w-full max-w-[48rem] flex-row">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                startups
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Lyft launching cross-platform service this week
              </Typography>
              <Typography color="gray" className="mb-8 font-normal">
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses. Yet its own business model disruption
                is only part of the story
              </Typography>
              <a href="#" className="inline-block">
                <Button variant="text" className="flex items-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
        </Drawer>
      </div>
      <div className="grid grid-cols-4 gap-y-8 max-w-screen-2xl mx-auto my-9">
        {products.map((x) => (
          <Card className="w-72 ">
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
              >
                <i className="fas fa-heart" style={{ fontSize: "20px" }} />
              </IconButton>
            </CardHeader>
            <CardBody className="h-40">
              <div className="mb-2 flex items-center justify-between">
                <Typography
                  color="blue-gray"
                  className="font-small text-clip truncate"
                >
                  {x.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  ${x.price}
                </Typography>
              </div>
              <Typography
                variant="small"
                size="sm"
                color="gray"
                className="font-normal opacity-75  text-clip truncate "
              >
                {x.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
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
