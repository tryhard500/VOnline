import { createRouter, createWebHistory } from 'vue-router'


// Компоненты страниц
import FeedPage from './views/FeedPage.vue';
import FriendsPage from './views/FriendsPage.vue';
import MesengerPage from './views/MesengerPage.vue';
import UserPage from './views/UserPage.vue';


export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'profile',
            component: UserPage,
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedPage
        },
        {
            path: '/messenger',
            name: 'messenger',
            component: MesengerPage
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendsPage
        }
    ]
})