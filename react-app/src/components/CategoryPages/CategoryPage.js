import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../store/all_products";
import Navigation from "../Navigation/Navigation";

import "./CategoryPage.css";
import "../ProductIndex/ProductIndex.css";

export default function CategoryPage({ categoryName }) {
  const dispatch = useDispatch();

  const products = useSelector((state) => Object.values(state.products));
  // const productImages = useSelector(state => Object.values(state.product_images))

  let categoryList = products.filter(
    (product) =>
      product.productCategory.name.toLowerCase() === categoryName.toLowerCase()
  );

  console.log(categoryList);

  useEffect(() => {
    dispatch(getProducts());
    // dispatch(getProductImages());
  }, [dispatch]);

  if (!products || products.length === 0) return null;
  return (
    <div className="category-page">
      <Navigation />
      <div className="category-name-container">
        <h1 className="category-page-name">{categoryName}</h1>
      </div>
      <div className="all-products-index">
        <div className="featured-product">
          <NavLink
            className="product-link"
            to={`/products/${categoryList[0].id}`}
          >
            <img
              alt="main-product-img"
              className="featured-product-image"
              src={
                categoryList[0].productImages[categoryList[0].previewImgId].url
              }
            ></img>
          </NavLink>
          <div className="featured-product-text">
            <h6 className="featured-product-category">
              {categoryList[0].category}
            </h6>
            <h1 className="featured-product-title">
              <NavLink
                className="product-link"
                to={`/products/${categoryList[0].id}`}
              >
                {categoryList[0].title}
              </NavLink>
            </h1>
            <p className="featured-product-description">
              <NavLink
                className="product-link"
                to={`/products/${categoryList[0].id}`}
              >
                {categoryList[0].description}
              </NavLink>
            </p>
            <span className="featured-product-buy-link">
              <NavLink
                className="product-link"
                to={`/products/${categoryList[0].id}`}
              >
                Buy From Uncrate Supply
              </NavLink>
            </span>
          </div>
        </div>
        <div className="all-other-products">
          {categoryList.map((product, idx) =>
            idx !== 0 ? (
              <div key={product.id} className="all-other-products-one-product">
                <NavLink
                  className="product-link"
                  to={`/products/${product.id}`}
                >
                  <img
                    alt="main-product-img"
                    className="all-other-products-image"
                    src={product.productImages[product.previewImgId].url}
                  ></img>
                </NavLink>
                <div className="all-other-products-text">
                  <h6 className="featured-product-category">
                    {product.productCategory.name.toUpperCase()}
                  </h6>
                  <h1 className="all-other-products-title">
                    <NavLink
                      className="product-link"
                      to={`/products/${product.id}`}
                    >
                      {product.title.toUpperCase()}
                    </NavLink>
                  </h1>
                  <p className="all-other-products-description">
                    <NavLink
                      className="product-link"
                      to={`/products/${product.id}`}
                    >
                      {product.description}
                    </NavLink>
                  </p>
                  <span className="featured-product-buy-link">
                    <NavLink
                      className="product-link"
                      to={`/products/${product.id}`}
                    >
                      Buy From Uncrate Supply
                    </NavLink>
                  </span>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}
