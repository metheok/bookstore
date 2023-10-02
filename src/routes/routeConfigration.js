import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import EditScreen from "../screens/EditScreen/EditScreen";
import NotFoundScreen from "../screens/NotFoundScreen/NotFoundScreen.js";

const routeConfig = [
  {
    path: "/search",
    component: SearchScreen,
  },
  {
    path: "/",
    component: HomeScreen,
  },
  {
    path: "/book",
    component: EditScreen,
  },
  {
    path: "/book/:slug",
    component: EditScreen,
  },

  {
    path: "*",
    component: NotFoundScreen,
  },
];

export default routeConfig;
