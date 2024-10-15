import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import api from "../api";
import { toast } from "react-toastify";

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  // api isteği
  const {isLoading,mutate}=useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),
    
    onSuccess: () => {
      toast.success("yeni tarif oluşturuldu");
      navigate("/");
     },
    onError: () => { 
      toast.error("bir hata oluştu");
    },
  })

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();
    // bütün inputlardaki verilere object formatında eriş
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    // adımları ',' e göre diziye çevir
    newRecipe.instructions = newRecipe.instructions.split(",");
    // malzemeleri nesneye ekle
    newRecipe.ingredients = ingredients;

    // api post isteği at
    mutate(newRecipe);

  };
  return (
    <div>
      <h1 className="text-red-400 text-3xl font-bold">
        Yeni Tarif Oluştur
      </h1>
      <form onSubmit={handleSubmit} className="my-10 flex flex-col gap-7 max-w-[550px] mx-auto">
        <Field label="Başlık">
          <input
            className="inp"
            type="text"
            name="recipeName"
          required/>
        </Field>

        <Field label="Kategori">
          <input
            className="inp"
            name="category"
         required />
        </Field>
        <Field label="Süre">
          <input
            className="inp"
            type="text"
            name="recipeTime"
          required/>
        </Field>
        <Field label="Malzemeler">
          <Select isMulti onChange={(options) =>
            setIngredients(options.map((opt) => opt.value))} required/>
        </Field>
        <Field label="Tarif Adımları (sıra önemli)">
          <textarea
            name="instructions"
            className="inp min-h-[80px] max-h-[200px]" required
          ></textarea>
        </Field>
        <Field label="Sunum Önerisi">
          <textarea
            name="servingSuggestion"
            className="inp min-h-[80px] max-h-[300px]"
          ></textarea>
        </Field>
        <div className="flex justify-end gap-6">
          <Link to="/" className="btn">
            Geri
          </Link>

          <button disabled={isLoading} type="submit" className="btn bg-red-400 hover:bg-red-500">
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

// HOC -higher order component
const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label} </label>
      {children}
    </div>
  );
};

export default Create;
