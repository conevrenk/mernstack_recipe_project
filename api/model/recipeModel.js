import fs from "fs";

// json dosyasının içeriğinin okur ve döndürür
export const readRecipes = () => { 
    try {
        const text =  fs.readFileSync(`./data.json`, "utf-8");
        const data = JSON.parse(text);
        
        return data;
        
    } catch (error) {
        console.log(error)
    }
};

// param olarak aldıgı veriyi json dosyasına yazar
export const writeRecipes = (data) => {
    try {
     fs.writeFileSync("./data.json",JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
 };

