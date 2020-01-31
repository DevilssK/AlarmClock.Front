
// Vue router setup
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "./components/Home";
import MainMenu from "./components/MainMenu";

import Snake from "./components/Snake";
import MathGame from "./components/Math";
import EndGame from "./components/EndGame";
import Reflex from "./games/Reflex.vue";

const routes = [
    { path: "", component: Home },
    { path: "/home", component: Home },
    { path: "/MainMenu", component: MainMenu },
    { path: "/Reflex", component: Reflex },
    { path: "/Snake/:Time/:id", component: Snake },
    { path: "/Math/:Time/:id", component: MathGame },
    { path: "/EndGame/:Score/:Limite/:Time/:id", component: EndGame }
];

export default new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
