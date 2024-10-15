import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {toast} from "react-toastify"
import api from "../api";

const Update = () => {

  const navigate = useNavigate();
  // url den düzenlecek elemanın id sini al
  const { id } = useParams();
  // apiden düzenlenecek elemanın bilgileri al
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });
  // api den güncelleme isteği atıcak mutasyonu hazırla
  const {isLoading,mutate}=useMutation({
    mutationFn: (updatedData) => 
      api.patch(`/api/v1/recipes/${id}`, updatedData),

     
    
    onSuccess: () => {
      toast.success('Güncelleme Başarılı');
     
      navigate(`/`);
    
    },
    onError: () => {
      toast.error(`Bir şeyler ters gitti`);
    }
  });
  return (
    <div>
      <div>
        <h1 className="text-red-400 text-3xl font-bold">Tarifi Düzenle</h1>

        {/* gerekli probları forma gönder */}
        <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
      </div>
    </div>
  );
};

export default Update;
