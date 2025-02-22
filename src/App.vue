<template>
	<div class="container">
		<div>
			<Aside />
		</div>
		<div>
			<router-view></router-view>
		</div>
	</div>
	<Menu />
</template>

<script setup lang="ts">
import Menu from './components/Menu.vue';
import Aside from './components/Aside.vue';
</script>

<style scoped>

.container {
	display: flex;
	height: 100%;
}

</style>
