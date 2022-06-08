import React, { useState, useEffect, useCallback, useRef } from "react";
import "./categ.scss";
import ItemCard from "../card/itemCard";
import Filter from "../filters/filter";
import SortBy from "../sortBy/sortBy";
import PrevArticle from "../article/prevArticle";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckAuth from "../checkAuth/checkAuth.js";

export default function Category() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [priceLimit, setPriceLimit] = useState([0, Number.MAX_SAFE_INTEGER]);
  const [dateLimit, setDateLimit] = useState(["1970", "1"]);
	const [region, setRegion] = useState("");
  const [sortby, setSortBy] = useState([]);
  const [showArticle, setShowArticle] = useState(false);
  const [url, setUrl] = useState("");
  const searchVal = useSelector((state) => state.searchRed.searchVal);
  const currentItem = useRef(0);
  const loc = useLocation();

  //api calls
  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
      credentials: "include",
    };
    if (loc.state === null) {
      setUrl(
        `/api/products/search?q=${searchVal}`,
        options
      );
    } else {
      setUrl(
        `/api/products/?categ=${loc.state.name}`,
        options
      );
    }
  }, [searchVal, loc.state]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        res
          .json()
          .then((data) => {
						setAllProducts([...data.products])
            setFiltredProducts([...data.products]);
          })
          .catch((e) => console.log({ error2: e }));
      })
      .catch((e) => console.log({ error1: e }));
  }, [url]);

  const handleShowArticle = (e) => {
    currentItem.current = e.currentTarget.id;
    setShowArticle(!showArticle);
  };

  //go back navigation
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  //sorting the data
  const handleSortingMemo = useCallback(
    (sortArr) => {
      setSortBy(() => {
        return [...sortArr];
      });
    },
    [setSortBy]
  );

  //setting the filters(price, date and region)
  const getFilters = (filprice, fildate, filregion) => {
    setPriceLimit(() => {
      return [...filprice];
    });
    setDateLimit(() => {
      return [...fildate];
    });
		console.log(filregion);
		setRegion(filregion);
  };

  //sorting the data based on prev assinged sort options
  useEffect(() => {
    const sortType = sortby[0];
    setFiltredProducts((prevState) => {
      let newState = [...prevState];
      if (sortby[1] === "asc") {
        switch (sortType) {
          case "pubDate":
            newState = newState.sort(
              (a, b) => new Date(a[sortType]) - new Date(b[sortType])
            );
            break;
          case "name":
            newState = newState.sort((a, b) => {
              return a.title.localeCompare(b.title, { sensitivity: "base" });
            });
            break;
          default:
            newState = newState.sort((a, b) => a[sortType] - b[sortType]);
        }
      } else {
        switch (sortType) {
          case "pubDate":
            newState = newState.sort(
              (a, b) => new Date(b[sortType]) - new Date(a[sortType])
            );
            break;
          case "name":
            newState = newState.sort((a, b) => {
              return b.title.localeCompare(a.title, { sensitivity: "base" });
            });
            break;
          default:
            newState = newState.sort((a, b) => b[sortType] - a[sortType]);
        }
      }
      return newState;
    });
  }, [sortby]);

  //filtring the results based on price and/or date
  useEffect(() => {
     const filterProducts = (minP, maxP, sDate) => {
       setFiltredProducts(() => {
         const newState = filtredProducts.filter(
           (ele) =>
             parseFloat(ele.price) > minP &&
             parseFloat(ele.price) < maxP &&
             new Date(ele.pubDate) > sDate
         );
         return newState;
       });
     };

     const minLimitPrice = parseFloat(priceLimit[0]);
     const maxLimitPrice = parseFloat(priceLimit[1]);
     const dateLimit_f = new Date(dateLimit[0], dateLimit[1]);

     filterProducts(minLimitPrice, maxLimitPrice, dateLimit_f);
  }, [priceLimit, dateLimit]);


	//filtring based on region
	useEffect(()=>{
		if(region !== "")
			setFiltredProducts(()=>{
				const regionPattern = new RegExp(region, "i");
				const newState = filtredProducts.filter((ele)=> {
					return regionPattern.test(ele.region)
				});
				return newState;
			})		
	}, [region])

	//clear filters
	const clearFilters = () => {
		setFiltredProducts([...allProducts]);
	};


  //comp return
  return (
    <>
      <CheckAuth />
      <div id="categ-main">
        <div id="filter">
          <Filter changeFilter={getFilters} clearFilters={clearFilters}/>
        </div>
        <div id="items-display">
          <div id="display-header">
            <button id="back-navigation" onClick={goBack}>
              &#10094; Go Back
            </button>

            <SortBy sortBy={handleSortingMemo} />
          </div>
          <ul id="list-items">
            {filtredProducts.map((item, index) => {
              const date = new Date(item.pubDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
              });
              return (
                <li
                  key={index}
                  id={index}
                  item={item}
                  className="items"
                  onClick={handleShowArticle}
                  tabIndex="0"
                >
                  <ItemCard
                    eleName={item.title}
                    image={item.images}
                    footer={true}
                    footerContent={[
                      ["Price", item.price + "$"],
                      ["Date", date],
                    ]}
                  />
                </li>
              );
            })}
          </ul>
          {showArticle ? (
            <PrevArticle
              item={filtredProducts[currentItem.current]}
              closeArticle={handleShowArticle}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
