import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import api from "../api";
import { toast } from "react-toastify";
import Form from "../components/Form";

const Create = () => {
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


  return (
    <div>
      <h1 className="text-red-400 text-3xl font-bold">
        Yeni Tarif Oluştur
      </h1>
     <Form isLoading={isLoading} mutate={mutate} />
    </div>
  );
};

export default Create;
