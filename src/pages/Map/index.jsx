import React, { useEffect } from "react";

import NavBar from "../../components/NavBar";
import "./index.css";
import styles from "./index.module.css";
import { getOverlays } from "../../api/home";

// 覆盖物样式
const labelStyle = {
  cursor: "pointer",
  border: "0px solid rgb(255, 0, 0)",
  padding: "0px",
  whiteSpace: "nowrap",
  fontSize: "12px",
  color: "rgb(255, 255, 255)",
  textAlign: "center",
};

export default function Map() {
  useEffect(() => {
    let map;
    function initMap() {
      const { label, value } = JSON.parse(window.localStorage.getItem("city"));
      map = new window.BMapGL.Map("container");
      const myGeo = new window.BMapGL.Geocoder();
      myGeo.getPoint(label, async (point) => {
        if (point) {
          //  初始化地图
          map.centerAndZoom(point, 11);
          // 添加常用控件
          map.addControl(new window.BMapGL.NavigationControl());
          map.addControl(new window.BMapGL.ScaleControl());
          renderOverlays(value);
        }
      });
    }
    async function renderOverlays(id) {
      const { body: houseList } = await getOverlays(id);
      const { nextZoom, type } = getTypeAndZoom();
      houseList.forEach((area) => {
        createOverlays(area, nextZoom, type);
      });
    }
    // 计算要绘制的覆盖物类型和下一个缩放级别
    // 区   -> 11 ，范围：>=10 <12
    // 镇   -> 13 ，范围：>=12 <14
    // 小区 -> 15 ，范围：>=14 <16
    function getTypeAndZoom() {
      // 调用地图的 getZoom() 方法，来获取当前缩放级别
      const zoom = map.getZoom();
      let nextZoom, type;

      // console.log('当前地图缩放级别：', zoom)
      if (zoom >= 10 && zoom < 12) {
        // 区
        // 下一个缩放级别
        nextZoom = 13;
        // circle 表示绘制圆形覆盖物（区、镇）
        type = "circle";
      } else if (zoom >= 12 && zoom < 14) {
        // 镇
        nextZoom = 15;
        type = "circle";
      } else if (zoom >= 14 && zoom < 16) {
        // 小区
        type = "rect";
      }

      return {
        nextZoom,
        type,
      };
    }
    function createOverlays(area, zoom, type) {
      const {
        coord: { longitude, latitude },
        label: areaName,
        count,
        value,
      } = area;
      // 创建坐标对象
      const areaPoint = new window.BMapGL.Point(longitude, latitude);

      if (type === "circle") {
        // 区或镇
        createCircle(areaPoint, areaName, count, value, zoom);
      } else {
        // 小区
        createRect(areaPoint, areaName, count, value);
      }
    }
    function createCircle(point, name, count, id, zoom) {
      // 创建覆盖物
      const label = new window.BMapGL.Label("", {
        position: point,
        offset: new window.BMapGL.Size(-35, -35),
      });

      // 给 label 对象添加一个唯一标识
      label.id = id;

      // 设置房源覆盖物内容
      label.setContent(`
        <div class="${styles.bubble}">
          <p class="${styles.name}">${name}</p>
          <p>${count}套</p>
        </div>
      `);

      // 设置样式
      label.setStyle(labelStyle);
      // 添加单击事件
      label.addEventListener("click", () => {
        // 调用 renderOverlays 方法，获取该区域下的房源数据
        renderOverlays(id);

        // 放大地图，以当前点击的覆盖物为中心放大地图
        map.centerAndZoom(point, zoom);

        // 解决清除覆盖物时，百度地图API的JS文件自身报错的问题
        setTimeout(() => {
          // 清除当前覆盖物信息
          map.clearOverlays();
        }, 0);
      });
      map.addOverlay(label);
    }
    function createRect(point, name, count, id) {
      // 创建覆盖物
      const label = new window.BMapGL.Label("", {
        position: point,
        offset: new window.BMapGL.Size(-35, -35),
      });

      // 给 label 对象添加一个唯一标识
      label.id = id;

      // 设置房源覆盖物内容
      label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `);

      // 设置样式
      label.setStyle(labelStyle);
      // 添加单击事件
      label.addEventListener("click", () => {});
      map.addOverlay(label);
    }
    initMap();
  });
  return (
    <div className="map">
      <NavBar className="navbar">地图找房</NavBar>
      <div id="container"></div>
    </div>
  );
}
