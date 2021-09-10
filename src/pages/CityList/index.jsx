import React, { useEffect, useState, useRef } from "react";
import { List, AutoSizer } from "react-virtualized";

import "./index.css";
import { getCityList } from "../../api/home";
import config from "../../config";
//导入组件
import NavBar from "../../components/NavBar";
export default function CityList(props) {
  const [cityList, setCityList] = useState({});
  const [cityIndex, setCityIndex] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const cityListRef = useRef();
  useEffect(() => {
    async function getCitys() {
      const res = await getCityList(1);
      const cityInfo = formatCityList(res.body);
      setCityList(cityInfo.cityList);
      setCityIndex(cityInfo.cityIndex);
      cityListRef.current.measureAllRows();
    }
    getCitys();
  }, []);
  function formatCityList(list) {
    let cityList = {};
    let cityIndex = [];
    list.forEach((city) => {
      const first = city.short[0];
      if (cityList[first]) cityList[first].push(city);
      else cityList[first] = [city];
    });
    cityIndex = Object.keys(cityList).sort();
    cityIndex.unshift("#");
    let { label, value } = JSON.parse(window.localStorage.getItem("city"));
    if (!label || !value) {
      label = "北京";
      value = "AREA|88cff55c-aaa4-e2e0";
    }
    cityList["#"] = [{ label, value }];
    return {
      cityList,
      cityIndex,
    };
  }
  function changeCity({ label, value }) {
    window.localStorage.setItem("city", JSON.stringify({ label, value }));
    props.history.goBack();
  }
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    style, // Style object to be applied to row (to position it)
  }) {
    return (
      <div key={key} style={style} className="city">
        <div className="title">{cityIndex[index]}</div>
        {cityList[cityIndex[index]].map((city) => (
          <div
            key={city.value}
            className="name"
            onClick={() => changeCity(city)}
          >
            {city.label}
          </div>
        ))}
      </div>
    );
  }
  //获取每一行高度
  function getRowHeight({ index }) {
    const { NAME_HEIGTH, TITLE_HEIGTHa } = config;
    return TITLE_HEIGTHa + cityList[cityIndex[index]].length * NAME_HEIGTH;
  }
  const changeIndex = (index) => {
    cityListRef.current.scrollToRow(index);
  };
  const renderIndex = () => {
    return cityIndex.map((item, index) => (
      <li
        key={item}
        className="city-index-item"
        onClick={() => changeIndex(index)}
      >
        <span className={activeIndex === index ? "index-active" : ""}>
          {item}
        </span>
      </li>
    ));
  };
  const onRowsRendered = ({ startIndex }) => {
    if (startIndex !== activeIndex) setActiveIndex(startIndex);
  };
  return (
    <div className="cityList">
      <NavBar>城市选择</NavBar>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={cityIndex.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
            onRowsRendered={onRowsRendered}
            ref={cityListRef}
            scrollToAlignment="start"
          />
        )}
      </AutoSizer>
      <ul className="city-index">{renderIndex()}</ul>
    </div>
  );
}
