import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import crypto from "crypto";
import isInValid from "../utils/isInValid.js";

const data = readRecipes();

export const getAllRecipes = (req, res) => {
  // tarif verisinin bir kopyasını oluştur
  let recipes = [...data];
  // aratılan kelime (kücük harf )
  const search = req.query?.search?.toLowerCase();

  // eğer search parametresi geldiyse filtreleme yap
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  // eğer order parametresi geldiyse geldiyse sıralama yap
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
         :    b.recipeTime - a.recipeTime
    );
  }

  // cliente cevap gönder
  res.status(200).json({
    status: "success",
    results: recipes.length,
    recipes: recipes,
  });
};

export const createRecipe = (req, res) => {
  // 1 isteğin body bölümünde gelen veriye eriş
  let newRecipe = req.body;

  // 2)veri bütünlüğünü kontrol et
  if (isInValid(newRecipe)) {
    return res
      .status(404)
      .json({ message: "lütfen bütün değerleri tanımlayın" });
  }

  // 3)veriye id ve foto ekle
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  // 4)tarif versini diziye ekle
  data.push(newRecipe);

  // 5)json dosyasını güncelle
  writeRecipes(data);

  // 6)cevap gönder
  res
    .status(201)
    .json({ message: "Yeni tarif oluşturuldu", recipe: newRecipe });
};

export const getRecipe = (req, res) => {
  res
    .status(200)
    .json({ message: "aradıgınız tarif bulundu ", found: req.foundRecipe });
};

export const deleteRecipe = (req, res) => {
  // silinecek elemanın sırasını kaldır
  const index = data.findIndex((i) => i.id === req.params.id);
  // elemanı diziden kaldır
  data.splice(index, 1);
  // json dosyasını güncelle
  writeRecipes(data);
  // cevap gönder
  res.status(204).json({});
};

export const updateRecipe = (req, res) => {
  // eski tarif nesnesinin güncelle
  const updated = { ...req.foundRecipe, ...req.body };
  // güncellenecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  // diziyi güncelle
  data.splice(index, 1, updated);

  // json dosyasını güncelle
  writeRecipes(data);

  // cevap gönder
  res.status(200).json({
    message: "tarif başarıyla güncellendi",
    recipe: updated,
  });
};
