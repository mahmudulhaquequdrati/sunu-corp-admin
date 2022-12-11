import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

const SingleDetails = () => {
  const [singleData, setSingleData] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://sunu-corp-backend-production.up.railway.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleData(data.data));
  }, [id]);

  const handleUpdate = (id, status) => {
    fetch(`https://sunu-corp-backend-production.up.railway.app/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          fetch(
            `https://sunu-corp-backend-production.up.railway.app/${singleData.category}`
          ).then((res) =>
            res.json().then((data) => {
              alert("Status updated successfully");
              navigate(`/all-lists/${singleData.category}`);
            })
          );
        }
      });
  };
  const handleDelete = (id) => {
    fetch(`https://sunu-corp-backend-production.up.railway.app/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          fetch(
            `https://sunu-corp-backend-production.up.railway.app/${singleData.category}`
          ).then((res) =>
            res.json().then((data) => {
              alert("Deleted successfully");
              navigate(`/all-lists/${singleData.category}`);
            })
          );
        }
      });
  };
  let date = singleData?.createdAt;
  if (date) {
    date = date.split("T")[0];
  }
  return (
    <div className="mx-24 mt-8 text-center">
      <div className="flex justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 mx-auto" />
        </Link>
        <Link to="/">
          <button className="bg-blue-500 text-white py-2 px-8 rounded-lg">
            Home
          </button>
        </Link>
      </div>
      <div className="shadow px-16 pb-16">
        <h1 className="my-6">Single Details</h1>
        <p className="my-4">Document:) </p>
        <img
          src={
            singleData.picture
              ? singleData.picture
              : "https://via.placeholder.com/150"
          }
          alt="photo_from_the_user"
          className="w-60 mx-auto mb-4"
        />
        <p className="">Requested person : {singleData?.name} </p>

        <p className="my-4">Requested Email : {singleData?.email}</p>

        <p className="my-4">Requested Number : {singleData?.number}</p>

        <p className="my-4">Submitted At : {date} </p>

        <h2>Description: {singleData?.description}</h2>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={() => handleUpdate(singleData._id, "Ready")}
        >
          Ready
        </button>

        <button
          onClick={() => handleUpdate(singleData._id, "Denied")}
          className="bg-red-300 text-white px-4 py-2 rounded-lg mt-4 ml-4"
        >
          Reject
        </button>
        <button
          onClick={() => handleDelete(singleData._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 ml-4"
        >
          Delete
        </button>
        <button
          onClick={() =>
            handleUpdate(singleData._id, "picked up by customer already")
          }
          className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 ml-4"
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default SingleDetails;
