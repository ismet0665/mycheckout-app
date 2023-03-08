import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
import axios from "axios";

// initalState diye değişken oluşturduk. Amacımız state i boşaltırken sadece değişkeni atamak olacak.
const initalState = {
  name: "",
  image: "",
  price: 0,
  dampingRate: 0.8,
  amount: 1,
};
const NewProduct = () => {
  const url = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState(initalState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); //change eventının gerçekleştiği inputtaki id attribute u ile formDatamdaki key değerlerim aynı olduğu için dinamik bir şekilde formData mı güncelleyebiliyorum.
    console.log({ [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, formData);
      setFormData(initalState); //post işleminden sonra formu boşaltmak için initialState değerini verdik
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <ProductForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        text="New" //başlık ve buton props gönderdik.yeni üründe new yazacak update sayfasında da text="update"yolladık.
      />
    </div>
  );
};

export default NewProduct;

// setFormData({ ...formData, [e.target.id]: e.target.value }); input ların id si striing oldugu için bracet notation [e.target.id] bu şekilde yakalıyoruz. burda dinamik key ile girilen her inputu onchange ile anlık yakalayıp value olarak alıyoruz.
// hangi inputa deger girdiyse ...formData key value dinamik şekilde veryi giriyoruz. bu şekilde yapmazsak her input için ayrı bir state oluşturulması gerekirdi. ayrıca inputlarda ki id ler ile formData daki id ler keyler eşit olması lazım initalState = {name: "",image: "",price: 0,dampingRate: 0.8,amount: 1, }; initalState de keyleri tanımladık ve default deger atadık.  key yani inputun id si eşit olmazsa yeni key value ekler.
