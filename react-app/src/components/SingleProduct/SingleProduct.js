import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { getSingleProduct } from "../../store/one_product";
import { getProducts } from "../../store/all_products";
import { deleteProduct } from "../../store/one_product";
import "./SingleProduct.css";
import Carousel from "./ImageCarousel/Carousel";
import SuggestedProducts from "./SuggestedProducts/SuggestedProducts";
import SupplyNavBar from "./SupplyNavBar/SupplyNavBar";
import { postCartItem } from "../../store/cart_items";

const availableProducts = [
  {
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/nude-glass-black-double-cigar-tray-21_large.jpg?v=1665409502",
    title: "NUDE ALTRUIST CIGAR ASHTRAY",
    price: 77,
    url: "/products/61",
  },
  {
    title: "ONSEN X UNCRATE BATH ROBE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/onsen-bath-robe-4_large.jpg?v=1637166523",
    price: 19,
    url: "/products/21",
  },
  // {
  //   title: "SEIKO MAI ALARM CLOCK",
  //   img: "https://cdn.shopify.com/s/files/1/0248/6216/products/seiko-wall-clock-blue-red-2_large.jpg?v=1670429553",
  //   price: 45,
  //   url: "/products/45"
  // },
  {
    title: "HOLDEN PUFFY SLIDES",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/holden-puffy-slides-black-5_large.jpg?v=1670255099",
    price: 85,
    url: "/products/16",
  },
  {
    title: "U-TURN ORBIT PLUS TURNTABLE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/uturn-orbit-pro-10_large.jpg?v=1604940280",
    price: 399,
    url: "/products/35",
  },
  {
    title: "PUNKT MP 02 GEN II PHONE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/punkt-mp02-4_large.jpg?v=1562592856",
    price: 350,
    url: "/products/41",
  },
  {
    title: "VINTAGE TENT FABRIC PET BED",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/vintage-tent-fabric-pet-bed-5_large.jpg?v=1670343945",
    price: 90,
    url: "/products/78",
  },
  {
    title: "INVESTING IN WRISTWATCHES: ROLEX",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/investing-in-wristwatches-5_large.jpg?v=1638980095",
    price: 95,
    url: "/products/80",
  },
  {
    title: "TINKERING LABS ELECTRIC MOTORS TOY KIT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/tinkering-labs-electric-motor-catalyst-21_large.jpg?v=1669066557",
    price: 65,
    url: "/products/79",
  },
  {
    title: "CANVAS FIREWOOD CARRIER",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/canvas-firewood-carrier-13_large.jpg?v=1589385240",
    price: 40,
    url: "/products/10",
  },
  {
    title: "TIVOLI PAL BLUETOOTH RADIO",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/tivoli-audio-portable-radio-6_large.jpg?v=1656613428",
    price: 219,
    url: "/products/44",
  },
  {
    title: "NITECORE NPS600 POWER STATION",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/nitecore-nps600-powerstation-7_large.jpg?v=1623248273",
    price: 900,
    url: "/products/39",
  },
  {
    title: "BARISIEUR BREWING ALARM CLOCK",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/barisiuer-coffee-clock-8_large.jpg?v=1532367542",
    price: 445,
    url: "/products/43",
  },
  {
    title: "KEYSMART WIRELESS CHARGING NOTEBOOK",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/keysmart-chargebook-9_large.jpg?v=1668178406",
    price: 120,
    url: "/products/42",
  },
  {
    title: "ERNEST HEMINGWAY BOOK SET",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/hemingway-custom-book-set-13_large.jpg?v=1583791157",
    price: 475,
    url: "/products/85",
  },
  {
    title: "MASTER & DYNAMIC MW08 SPORT ANC TRUE WIRELESS EARPHONES",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/master-dynamic-mw08-black-4_large.jpg?v=1642538327",
    price: 219,
    url: "/products/37",
  },
  {
    title: "KLARO MILITARY EDITION HUMIDOR",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/klaro-humidor-black-9_large.jpg?v=1669060458",
    price: 300,
    url: "/products/56",
  },
  {
    title: "PRIDE & GROOM LUXE GIFT SET",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/Pride-and-Groom-Shedder-Shampoo-3_large.jpg?v=1637079283",
    price: 70,
    url: "/products/84",
  },
  {
    title: "GEARBOX TRANSPARENT TURNTABLE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/gear-box-turntable-7_large.jpg?v=1579554831",
    price: 545,
    url: "/products/38",
  },
  {
    title: "FILSON MACKINAW WOOL BLANKET",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/filson-plaid-wool-blanket-2_large.jpg?v=1668803655",
    price: 295,
    url: "/products/50",
  },
  {
    title: "FAHERTY LEGEND QUARTER ZIP",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/faherty-black-sweater-shirt-22_large.jpg?v=1666892945",
    price: 98,
    url: "/products/18",
  },
  {
    title: "SUNSPEL FLEECEBACK JOGGERS",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/sunspel-fleeceback-sweatpants-white-melange-5_large.jpg?v=1670351583",
    price: 16,
    url: "/products/14",
  },
  {
    title: "ALESSI SPIRALE ASHTRAY",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/alessi-ashtray-4.jpg?v=1668529138",
    price: 12,
    url: "/products/58",
  },
  {
    title: "NOCS MONOLITH SPEAKER",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/nocs-design-monolith-speaker-21_large.jpg",
    price: 1200,
    url: "/products/34",
  },
  {
    title: "NIGHTWATCH MAGNIFYING APPLE WATCH DOCK",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/night-watch-apple-watch-stand-5_large.jpg?v=1638724614",
    price: 69,
    url: "/products/36",
  },
  {
    title: "IT'S OK NIGHT EDITION BLUETOOTH CASSETTE PLAYER",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/its-ok-cassette-player-black-4_large.jpg?v=1612809301",
    price: 120,
    url: "/products/40",
  },
  {
    title: "HYPELEV LEVITATING SNEAKER DISPLAY STAND",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/hype-lev-levitator-3_large.jpg?v=1670008619",
    price: 249,
    url: "/products/46",
  },

  {
    title: "SHINGLE AND STONE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/shingles-and-stones-5_large.jpg",
    price: 75,
    url: "/products/87",
  },
  {
    title: "PORSCHE 959",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/porsche-959-book-7_large.jpg?v=1668704045",
    price: 13,
    url: "/products/86",
  },
  {
    title: "POPCORN ON THE COB",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/petersens-microwavable-corn-cob-20_large.jpg",
    price: 25,
    url: "/products/83",
  },
  {
    title: "THOMAS KELLER K+M HOT CHOCOLATE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/thomas-keller-hot-chocolate-3_large.jpg?v=1636652156",
    price: 24,
    url: "/products/82",
  },
  {
    title: "BUILD YOUR OWN SKELETON",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/build-your-own-skeleton-8_large.jpg?v=1571413426",
    price: 40,
    url: "/products/88",
  },
  {
    title: "1000 DESIGN CLASSICS",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/phaidon-1000-design-classics-5_large.jpg?v=1669832484",
    price: 90,
    url: "/products/81",
  },
  {
    title: "TOOLETRIES ULTIMATE SHOWER SET",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/tooletries-shower-set-7_large.jpg?v=1670015639",
    price: 24,
    url: "/products/71",
  },
  {
    title: "DANESON BOOZE & MINT TOOTHPICKS",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/daneson-every-blend-pack-5_large.jpg?v=1670595923",
    price: 32,
    url: "/products/67",
  },
  {
    title: "CARBON FIBER HUMIDOR",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/broku-co-cf-humidor-7_large.jpg?v=1646677267",
    price: 22,
    url: "/products/65",
  },
  {
    title: "CARBON FIBER CIGAR TUBE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/brouk-and-co-single-humidor-4_large.jpg",
    price: 75,
    url: "/products/64",
  },
  {
    title: "TRAVEL CIGAR HUMIDOR",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/brouk-and-co-humidor-canister-4_large.jpg?v=1646684172",
    price: 75,
    url: "/products/63",
  },
  {
    title: "HEMSON STEALTH BLACK CLASSIC PIPE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/hemson-black-pipe-4_large.jpg?v=1643653839",
    price: 90,
    url: "/products/62",
  },
  {
    title: "SPACE SHUTTLE DISCOVERY LIFTOFF FRAMED PRINT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/nasa-ipwk-rocket-print-black-2_large.jpg?v=1667571656",
    price: 26,
    url: "/products/55",
  },
  {
    title: "STEVE MCQUEEN & WIFE FRAMED PRINT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/mcqueen-shop-tub1_large.jpg?v=1638216398",
    price: 26,
    url: "/products/54",
  },
  {
    title: "ANDY WARHOL IN VENICE FRAMED PRINT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/warhol-kpzn-print-black-2_large.jpg?v=1668094807",
    price: 26,
    url: "/products/53",
  },
  {
    title: "SEAN CONNERY PLAYS GOLF FRAMED PRINT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/sean-connery-golfing-IPPI-black-2_large.jpg?v=1668093935",
    price: 26,
    url: "/products/52",
  },
  {
    title: "URSULA ANDRESS AT CASINO ROYALE FRAMED PRINT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/Ursula-TFSK-bond-print-black-2_large.jpg?v=1668456324",
    price: 26,
    url: "/products/51",
  },
  {
    title: "PORSCHE 356 NOSE FRAMED PRINT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/porsche-356-nose-print-black-2_large.jpg?v=1668782455",
    price: 26,
    url: "/products/49",
  },
  {
    title: "HERMAN MILLER NELSON FIREPLACE TOOL SET",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/herman-miller-nelson-fireplace-toolkit-6_large.jpg?v=1664810003",
    price: 39,
    url: "/products/48",
  },
  {
    title: "REIGNING CHAMP X PENDLETON STADIUM BLANKET",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/reigning-champ-pendleton-stadium-blanket-6_large.jpg?v=1669043563",
    price: 40,
    url: "/products/47",
  },
  {
    title: "REIGNING CHAMP MIDWEIGHT SLIM SWEATPANT",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/reigning-champ-terry-joggers-3_large.jpg?v=1606589115",
    price: 12,
    url: "/products/2",
  },
  {
    title: "NEW BALANCE 574H HIKING SNEAKERS",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/new-balance-974h-hikers-sq_large.jpg?v=1669992226",
    price: 13,
    url: "/products/20",
  },
  {
    title: "FILLING PIECES MID ACE SPIN SNEAKERS",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/filling-pieces-hightop-sneakers-6_large.jpg?v=1670254620",
    price: 245,
    url: "/products/17",
  },
  {
    title: "POWERUP 4.0 POWERED PAPER AIRPLANE",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/powerup-4-remote-plane-6_large.jpg?v=1606234163",
    price: 69,
    url: "/products/4",
  },

  {
    title: "A-TECH AIRTAG MULTI TOOL",
    img: "https://cdn.shopify.com/s/files/1/0248/6216/products/atech-airtag-7-tool-multitool-7_large.jpg?v=1670423738",
    price: 35,
    url: "/products/1",
  },
];

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const singleProduct = useSelector((state) => state.product[id]);
  console.log("single product -->", singleProduct);
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  let productList = [];
  const shuffled = availableProducts.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 8);
  productList.push(selected);

  console.log(productList);

  let imgList = [];

  if (singleProduct) {
    for (let id in singleProduct.productImages) {
      if (singleProduct.productImages[id].productId === singleProduct.id) {
        imgList.push(singleProduct.productImages[id].url);
      }
      console.log(imgList);
    }
  }

  if (!singleProduct) return null;

  return (
    <div className="single-product-page">
      <SupplyNavBar />
      <div className="single-product">
        <Carousel infinite imageLength={imgList.length}>
          <img
            src={singleProduct.productImages[singleProduct.previewImgId].url}
            alt="single-product"
          />
          {imgList[1] ? <img src={imgList[1]} alt="single-product" /> : ""}
          {imgList[2] ? <img src={imgList[2]} alt="single-product" /> : ""}
          {imgList[3] ? <img src={imgList[3]} alt="single-product" /> : ""}
          {imgList[4] ? <img src={imgList[4]} alt="single-product" /> : ""}

          {/* {imgList[0] ? <img src={imgList[0]} alt="single-product" /> : ""} */}
        </Carousel>
        <div className="single-product-details">
          <p className="single-product-category">
            <a href="#hi">{singleProduct.productCategory.name}</a>
          </p>
          <h1>
            {singleProduct.title.toUpperCase()} / ${singleProduct.price}
          </h1>
          <p className="single-product-detailed-description">
            {singleProduct.detailedDescription}
          </p>
          <p className="single-product-details-greentxt">
            IN STOCK AND SHIPS FREE WITH EASY RETURNS.
          </p>
          <div className="single-product-details-btns">
            <button
              className="single-product-details-btn btn-add-cart"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(postCartItem(singleProduct.id));
                history.push("/cart");
              }}
            >
              ADD TO CART
            </button>
            <button className="single-product-details-btn btn-stash-later">
              STASH FOR LATER
            </button>

            {user && user.id === singleProduct.productOwner.id && (
              <button
                className="delete-product-btn"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteProduct(singleProduct.id));
                  history.push("/");
                }}
              >
                REMOVE MY LISTING
              </button>
            )}
          </div>
        </div>
        <SuggestedProducts
          productList={selected}
          productImages={
            singleProduct.productImages[singleProduct.previewImgId].url
          }
        />
      </div>
    </div>
  );
};

export default SingleProduct;
