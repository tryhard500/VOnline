<script>

// Компоненты
import AppHeader from './components/AppHeader.vue';
import { RouterView } from 'vue-router'

// Главная страница
export default {
	components: {
		AppHeader,
		RouterView,
	}
};


</script>

<template>
	<div class="app">
        <div class="row justify-content-center">
            <app-header></app-header>
            <router-view></router-view>
        </div>
	</div>
</template>

<style>
body {
	background-color: #EDEEF0;
}
</style>
