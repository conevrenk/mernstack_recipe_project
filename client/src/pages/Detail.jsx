import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import api from "../api/index";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaClock } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";

const Detail = () => {
  const { id } = useParams();
  // id si bilinene elemanın bilgilerini api den al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`api/v1/recipes/${id}`).then((res) => res.data.found),
  });
  console.log(data);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Link to={-1} className="btn flex items-center gap-2 py-1">
          <IoMdArrowRoundBack />
          Geri
        </Link>
        <button className="btn flex gap-2 items-center bg-red-500 hover:bg-red-700 py-1">
          <FaTrashAlt />
          Sil
        </button>
      </div>
      {isLoading ?
        (<Loader />)
        : error
          ? (<Error info={error.message} refetch={refetch} />)
          : data && (
            <div>
              <h1 className="title text-3xl ">{data.recipeName} </h1>
              <div className="flex gap-4 my-5">
                <span className="badge">
                <PiForkKnifeFill/> {data.category} </span>
                <span className="badge">
                <FaClock/>  {data.recipeTime} </span>
              </div>
              <img
                className="rounded-lg max-h-[350px] w-full object-cover"
                src={data.image}
                alt={data.recipeName}
              />
              <div className="my-5">
                <h2 className="title">Malzemeler</h2>
                <ul>
                  {data.ingredients.map((i) => (
                    <li className="font-semibold text-lg">{i} </li>
                  ))}
                </ul>
              </div>
              <div className="my-5">
                <h2 className="title">Tarif Bilgisi</h2>
                <ol className="list-decimal ps-4">
                  {data.instructions.map((i) => (
                    <li className="font-semibold text-lg">{i} </li>
                  ))}
                </ol>
              </div>
              
              {data.servingSuggestion && (
                < div className="my-5">
                  <h2 className="title">Sunum Önerisi</h2>
                  <p className="text-lg font-semibold">{data.servingSuggestion}
                  </p>
                </div>
              )}
            </div>
          )   
  }
    </div>
  )
}

export default Detail;
