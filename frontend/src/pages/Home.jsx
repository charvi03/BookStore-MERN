import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="p-6 h-screen
     bg-gradient-to-b from-red-300 to-white "
    >
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-red-500 border-2 hover:bg-sky-600 px-4 py-1 rounded-lg hover:translate-y-2 duration-300"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-red-500 border-2 hover:bg-sky-600 duration-200 px-4 py-1 rounded-lg hover:translate-y-2 "
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl italic my-8 animate-bounce">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-700 text-4xl hover:rotate-90 ease-in-out duration-500" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
