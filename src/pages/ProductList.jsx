import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CardTotal from "../components/CardTotal";
import axios from "axios";
// .env ekledikten sonra AÇ KAPA yapmamız lazım.
const ProductList = () => {
  const url = process.env.REACT_APP_API_URL; //.env den veriyi çekmek için process.env sonra değişken ismi yazıyoruz.
  // console.log(url);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); //başlangıçta loading göstersin
  const [errorState, setErrorState] = useState(false); //errora düşerse error göstersin

  const getProducts = async () => {
    try {
      setLoading(false); //try a girdiğinde loadingi false a çek diyorum ki sonucu bilebileyim
      const { data } = await axios(url);
      // console.log(data);
      setProducts(data);
      setErrorState(false); // işlem başarılı olursa erroru false a çekiyorum
      console.log(data);
    } catch (error) {
      console.log(error);
      setErrorState(true); //catche düştüğünde errorstate ini true değerine çeviriyorum
    }
  };

  // console.log(products);

  // sayfa ilk açıldıgında useEffect in componentDidMount aşamasında yani getProducts() fonk çagıracak ve veriyi çekecek.
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mt-3">
      <div className={"bg-light d-sm-block d-md-flex"}>
        {loading ? (
          <p className="text-center text-danger w-100">Loading....</p>
        ) : products.length > 0 ? (
          <>
            <article id="product-panel" className="col-md-5">
              {products.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    item={item}
                    getProducts={getProducts} // silme,artırma işlemlerinde tekrar api den güncel veriyi çekmek için props olarak get istegini yolladık.
                  />
                );
              })}
            </article>
            <article className="col-md-5 m-3">
              <CardTotal products={products} />
            </article>
          </>
        ) : (
          !errorState && (
            <p className="text-center text-danger w-100">No products data...</p>
          )
        )}

        {errorState && (
          <p className="text-center text-danger w-100">Error...</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

//! axios istek atıyorsam verim data içerisinde geliyor. Yani gelen response cevap ta verim data key i içinde geliyor. bu yüzden {data} şeklinde data yı desct. ediyoruz.
// const { data } = await axios(url);
// axios veri çekerken gelen veriyi state atıyoruz.
