import React from "react";
import logo from "../assets/logo.jpeg";
import physics from "../assets/physics.jpg";
import science from "../assets/science.jpg";
import cetificate from "../assets/certificate.jpg";
import library from "../assets/library.jpg";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Attestation-Speciale",
      picture: science,
    },
    {
      id: 2,
      name: "Diplôme-du-Bac",
      picture: physics,
    },
    {
      id: 3,
      name: "Duplicata-Diplôme-Bac",
      picture: cetificate,
    },
    {
      id: 4,
      name: "Relevés-de-Notes",
      picture: library,
    },
  ];

  const handleDetails = (name) => {
    navigate(`/all-lists/${name}`);
  };

  return (
    <div className="m-12">
      <div className="flex justify-between my-4">
        <img src={logo} alt="logo" className="w-24 " />
        <Link to="/">
          <button className="bg-blue-500 text-white py-2 px-8 rounded-lg ">
            Home
          </button>
        </Link>
      </div>
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
