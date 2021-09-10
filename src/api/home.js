import axios from "./index";

export const getSwipers = () => {
  return axios.get("/home/swiper");
};

export const getGroups = () => {
  return axios.get("/home/groups", {
    params: {
      area: "AREA%7C88cff55c-aaa4-e2e0",
    },
  });
};

export const getNews = () => {
  return axios.get("/home/news", {
    params: {
      area: "AREA%7C88cff55c-aaa4-e2e0",
    },
  });
};

export const getArea = (name) => {
  return axios.get("/area/info", {
    params: {
      name,
    },
  });
};

export const getCityList = (level) => {
  return axios.get("/area/city", {
    params: {
      level,
    },
  });
};

export const getOverlays = (id) => {
  return axios.get("/area/map", {
    params: {
      id,
    },
  });
};
