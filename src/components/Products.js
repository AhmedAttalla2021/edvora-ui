import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../css/products.css";
import Slider from "react-slick";
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = () => {
  let [productsArr, setProductsArr] = useState([]);
  let [filteredArr, setFilteredArr] = useState([]);
  let [showDiv, setShowDiv] = useState(false);
  let [dropState, setDropState] = useState([]);
  let [dropCity, setDropCity] = useState([]);
  let productsRef = useRef("");
  let stateRef = useRef("");
  let cityRef = useRef("");
  useEffect(async () => {
    await axios
      .get("https://assessment-edvora.herokuapp.com/")
      .then((products) => {
        setProductsArr(products.data);
      });
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", margin: 0 }}
        onClick={onClick}
      />
    );
  }

  function SampleprevArrow(props) {
    return <div style={{ display: "none" }} />;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleprevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const productFunc = (e) => {
    productsRef.current.innerText = e.target.innerText;
    stateRef.current.innerText = "State";

    let myProducts = productsArr.filter(
      (product) => product.brand_name === e.target.innerText
    );
    setFilteredArr(myProducts);
    setDropState(myProducts);
    setShowDiv(true);
  }; // end of products function

  const stateFunc = (e) => {
    stateRef.current.innerText = e.target.innerText;
    cityRef.current.innerText = "City";
    let stateProducts = dropState.filter(
      (product) => product.address.state === e.target.innerText
    );
    setFilteredArr(stateProducts);
    setDropCity(stateProducts);
    console.log("ahmed");
  }; // end of state function

  const cityFunc = (e) => {
    cityRef.current.innerText = e.target.innerText;
    let cityProducts = dropCity.filter(
      (product) => product.address.city === e.target.innerText
    );
    setFilteredArr(cityProducts);
  }; // end of city function

  return (
    <>
      <div className="main">
        <div className="filtersDiv ">
          <div className="dropdownsDiv">
            <div className="filtersTitle"> Filters </div>
            <hr className="myHr" />

            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle myBtn"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ref={productsRef}
              >
                Products
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {productsArr.map((ele) => {
                  return (
                    <li onClick={productFunc}>
                      <a class="dropdown-item" href="#">
                        {ele.brand_name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ref={stateRef}
              >
                State
              </button>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {dropState.map((ele) => {
                  return (
                    <li onClick={stateFunc}>
                      <a class="dropdown-item" href="#">
                        {ele.address.state}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ref={cityRef}
              >
                City
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {dropCity.map((ele) => {
                  return (
                    <li onClick={cityFunc}>
                      <a class="dropdown-item" href="#">
                        {ele.address.city}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* <Dropdown toggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
            <DropdownToggle caret>^</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem onClick={(e) => console.log(e.target.innerText)}>
                Action 1
              </DropdownItem>
              <DropdownItem onClick={(e) => console.log(e.target.innerText)}>
                Action 2
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </div>

        <div className="productsDiv ">
          <div className="title1">Edvora</div>
          <div className="title2"> products</div>
          <div className="proName">product name</div>
          {showDiv ? (
            <div className="sliderDiv row justify-content-center ">
              <Slider {...settings} className="mb-4">
                {filteredArr.map((product) => {
                  return (
                    <div className="slide mb-3 pt-2" key={product.product_name}>
                      <div className="boxx row m-2">
                        <div className="leftHalf col-6 ">
                          <div className="pic col-12">
                            <img src={product.image} />
                          </div>
                          <div className="city col-12">
                            {product.address.city}
                          </div>
                          <div className="disc col-12">
                            {product.discription}
                          </div>
                        </div>

                        <div className="rightHalf col-6">
                          <div className="name col-12">
                            {product.product_name}
                          </div>
                          <div className="brand col-12">
                            {product.brand_name}
                          </div>
                          <div className="price col-12">{`$ ${product.price}`}</div>
                          <div className="date col-12 mb-2">{`Date ${
                            product.date.split("T")[0]
                          }`}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <div className="chooseDiv"> Choose product </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
