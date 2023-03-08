import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
// ProductCard ürünleri basacagımız component
const ProductCard = ({ item, getProducts }) => {
  const url = process.env.REACT_APP_API_URL;
  const { name, image, price, dampingRate, amount, id } = item;
  const navigate = useNavigate(); //!update tıkladığımızda update-product sayfasına gitmek için useNavigate hookuna ihtiyacımız var
  // yukarda item desc ettigimizden id miz var async (id) YAZMAMIZA gerek kalmadı.
  // handleMinus kısmında verimizde nereyi güncelleyeceksek put işleminde verimizi açıyoruz ...item sonra hangi key:value degeri değişecekse onu yazıyoruz.  await axios.put(`${url}/${id}`, {...item,amount: amount - 1,});
  const handleMinus = async () => {
    if (amount - 1) {
      // sayi yani adet 0 olunca else kısmında handleRemove() ile siliyoruz.yada alert msj.
      try {
        await axios.put(`${url}/${id}`, {
          ...item,
          amount: amount - 1,
        });
      } catch (error) {}
      getProducts(); //silme işleminden sonra api ye tekrar istek atmamız lazım ki güncel veri gelsin.
    } else {
      // handleRemove();
      alert("Ürünü Silmek İstiyorsanız Remove Butonuna Tıklayabilirsiniz");
    }
  };

  const handlePlus = async () => {
    try {
      await axios.put(`${url}/${id}`, {
        ...item,
        amount: amount + 1,
      });
    } catch (error) {}
    getProducts();
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      console.log(error);
    }
    getProducts();
  };

  const editProduct = () => {
    navigate("/update-product", { state: item });
  };

  return (
    <div className="card shadow-lg mb-3">
      <div className="row g-0">
        <div className="col-md-5">
          <img
            src={image}
            className="w-100 h-100 rounded-start image"
            alt={name}
            title={""}
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="product-price">
              <p className="text-warning h2">
                $
                <span className="damping-price">
                  {(price * dampingRate).toFixed(2)}
                </span>
                <span className="h5 text-dark text-decoration-line-through">
                  {parseFloat(price).toFixed(2)}{" "}
                  {/*parseFloat ile price ı float veri tipe çeviriyoruz ki toFixed kullanabilelim.*/}
                </span>
              </p>
            </div>
            <div className="border border-1 border-dark shadow-lg d-flex justify-content-center p-2">
              <div className="quantity-controller">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleMinus}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <p className="d-inline mx-4" id="product-quantity">
                  {amount}
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handlePlus}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="product-removal mt-4 d-flex flex-column gap-1">
              <button
                className="btn btn-danger btn-sm w-100 remove-product"
                onClick={handleRemove}
              >
                <i className="fa-solid fa-trash-can me-2"></i>Remove
              </button>
              <button
                className="btn btn-danger btn-sm w-100 remove-product"
                onClick={editProduct}
              >
                <i class="fa-solid fa-wrench"></i> Update Product
              </button>
            </div>
            <div className="mt-2">
              Product Total: $
              <span className="product-line-price">
                {(price * dampingRate * amount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
