import React, { useEffect } from "react";
import logo from "../assets/logo.jpeg";
import physics from "../assets/physics.jpg";
import science from "../assets/science.jpg";
import cetificate from "../assets/certificate.jpg";
import library from "../assets/library.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   //https://sunu-corp-backend-production.up.railway.app/
  //   // http://192.168.0.107:5000
  //   const socket = io("https://sunu-corp-backend-production.up.railway.app");

  //   // socket.on("connect", () => {
  //   //   console.log("connected");
  //   // });
  //   // socket.on("disconnect", () => {
  //   //   console.log("disconnected");
  //   // });
  //   // socket.on("message", (message) => {
  //   //   console.log(message);
  //   // });
  // }, []);

  const categories = [
    {
      id: 1,
      name: "Science",
      picture: science,
    },
    {
      id: 2,
      name: "Physics",
      picture: physics,
    },
    {
      id: 3,
      name: "Certificate",
      picture: cetificate,
    },
    {
      id: 4,
      name: "Library",
      picture: library,
    },
  ];

  const handleDetails = (name) => {
    navigate(`/all-lists/${name}`);
  };

  return (
    <div className="m-12">
      <img src={logo} alt="logo" className="w-24 mx-auto" />
      <h3 className="text-center font-medium mt-4">Welcome to admin panel</h3>
      <p className="text-center font-medium mt-2">
        Chose any category to see all of the request.
      </p>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-24 mt-8">
          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-4"
              onClick={() => {
                handleDetails(item.name);
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex-shrink pr-4">
                  <div className=" p-5 ">
                    <img
                      src={item.picture}
                      alt="logo"
                      className="w-24 h-24 mx-auto rounded-full"
                    />
                  </div>
                </div>
                <div className="flex-1 text-right md:text-center">
                  <h5 className="font-bold uppercase text-gray-600">
                    {item.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
