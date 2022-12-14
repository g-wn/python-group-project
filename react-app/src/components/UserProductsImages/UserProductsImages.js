import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { getProducts } from '../../store/all_products';
import { Modal } from '../../context/Modal';
import ImageForm from './ImageForm';
import SupplyNavBar from '../SingleProduct/SupplyNavBar/SupplyNavBar';

import './UserProductsImages.css';
import { deleteProductImage } from '../../store/one_product';

const UserProductsImages = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector(state => state.products);
  const product = products[id];
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (!product) return null;

  // Add all but the main image into an array:
  let productImageUrls = [];
  for (const image in product.productImages) {
    if (
      product.productImages[image].id !== product.previewImgId &&
      !product.productImages[image].url.includes('shopify')
    ) {
      productImageUrls.push(product.productImages[image]);
    }
  }

  return (
    <>
      <SupplyNavBar />
      <div className='add-edit-image-form'>
        <div className='add-edit-image-header'>
          <header>Add or Edit an Image</header>
          <button className='add-image-btn'>
            <AiOutlinePlusCircle size={35} />
          </button>
        </div>

        <div
          className='main-image'
          style={{
            backgroundImage: `url("${product.productImages[product.previewImgId].url}")`
          }}
        >
          <button
            className='edit-btn'
            onClick={() => {
              setModalData(product.productImages[product.previewImgId].id);
              setShowModal(true);
            }}
          >
            <AiTwotoneEdit
              size={25}
              className='edit-icon'
            />
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ImageForm
                modalData={modalData}
                formType={'edit'}
                setShowModal={setShowModal}
              />
            </Modal>
          )}
        </div>

        <div className='product-images-container'>
          {product ? (
            productImageUrls.map((image, idx) => (
              <div
                className='single-image-container'
                key={idx}
                style={{
                  backgroundImage: `url("${image.url}")`
                }}
              >
                <button
                  className='delete-btn'
                  onClick={async () => {
                    await dispatch(deleteProductImage(image.id));
                    dispatch(getProducts());
                  }}
                >
                  <MdDelete
                    size={25}
                    className='delete-icon'
                  />
                </button>
                <button
                  className='edit-btn'
                  onClick={() => {
                    setModalData(image.id);
                    setShowModal(true);
                  }}
                >
                  <AiTwotoneEdit
                    size={25}
                    className='edit-icon'
                  />
                </button>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <ImageForm
                      modalData={modalData}
                      formType={'edit'}
                      setShowModal={setShowModal}
                    />
                  </Modal>
                )}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProductsImages;