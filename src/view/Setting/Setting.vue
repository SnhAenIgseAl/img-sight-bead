<template>

	<div style="margin: 16px;">
		<t-typography-title level="h4">快捷键设置</t-typography-title>
		<div class="setting-container">

			<p v-for="(keyItem, keyIndex) in settingList" 
				:key="keyIndex" 
				class="setting-list">

				<span>{{ keyItem.name }}：
					<t-typography-text theme="error">
						{{ keyItem.key }}
					</t-typography-text>
				</span>

				<t-button theme="default" 
					@click="listening(keyItem.key)">
					更改
				</t-button>
			</p>
		</div>

		<t-typography-title level="h4">图床设置</t-typography-title>
		<div class="setting-container">
			<p v-for="(tokenItem, tokenIndex) in tokenList" 
				:key="tokenIndex" 
				class="setting-list">
				<span style="width: 90px;">{{ tokenItem }}：</span>
				<t-input v-model="USER_UPLOAD_TOKEN[tokenItem as keyof typeof USER_UPLOAD_TOKEN]" 
					placeholder="请输入token" 
					size="large"
					:disabled="!(USER_UPLOAD_SITE === tokenItem)">
				</t-input>
			</p>
			<p class="setting-list">
				<span style="width: 90px;">图床：</span>
				<t-select v-model="USER_UPLOAD_SITE" size="large">
					<t-option v-for="(siteItem, siteKey) in USER_UPLOAD_SITE_OPTIONS" 
						:key="siteKey" 
						:label="siteItem" 
						:value="siteItem" 
					/>
				</t-select>
			</p>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue'
import { useSettingStore } from '../../store/setting'
import { storeToRefs } from 'pinia';
import { NotifyPlugin } from 'tdesign-vue-next';



const {
	USER_CHANGE_WINDOW_KEY,
	USER_RESTORE_WINDOW_KEY,
	USER_WINDOW_CENTER_KEY,
	USER_UPLOAD_TOKEN,
	USER_UPLOAD_SITE,
	USER_UPLOAD_SITE_OPTIONS
} = storeToRefs(useSettingStore())

const {
	
} = useSettingStore()

const settingList = [
	{
		name: '应用准星快捷键',
		key: USER_CHANGE_WINDOW_KEY
	},
	{
		name: '显示窗口快捷键',
		key: USER_RESTORE_WINDOW_KEY
	},
	{
		name: '窗口居中快捷键',
		key: USER_WINDOW_CENTER_KEY
	}
]

const isListening = ref(false)
let keyName = ref('')

const tokenList = ref(['picui', 'imgbb', 'sm',])



const listening = (key: Ref<string>) => {
	isListening.value = true
	NotifyPlugin.info({
		title: '提示',
		content: '请按下快捷键'
	})
	keyName = key
}

const handleKeyDown = (event: KeyboardEvent) => {
	if (isListening.value) {

		for (let i = 0; i < settingList.length; i++) {

			if (settingList[i].key.value === event.key) {
				NotifyPlugin.error({
					title: '错误',
					content: '快捷键已存在'
				})
				isListening.value = false
				return
			}
		}

		setKey(keyName, event)
		NotifyPlugin.success({
			title: '成功',
			content: '设置成功'
		})
		isListening.value = false
	}
}

const setKey = (keyName: Ref<string>, event: KeyboardEvent) => {
	keyName.value = event.key
}

onMounted(() => {
	window.addEventListener('keydown', handleKeyDown);
})

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyDown);
})


</script>

<style scoped>
.setting-container {
	width: 480px;
	/* margin: 16px; */
	padding: 16px;
	/* padding-left: 96px; */
	display: flex;
	gap: 16px;
	flex-flow: column nowrap;
	background-color: #fff;
	border: 1px solid var(--cl-black-10);
	border-radius: 8px;
	/* box-shadow: 0 0 8px var(--cl-black-10); */
}

.setting-list {
	display: flex;
	gap: 16px;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	color: var(--cl-black-75);
}
</style>