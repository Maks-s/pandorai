<template>
  <n-button
    block
    ghost
    icon-placement="right"
    class="!justify-between big-icon"
    @click="changeChat"
  >
    <n-input
      v-if="editMode"
      ref="input"
      v-model:value="title"
      :autofocus="true"
      class="text-start inline-input"
    ></n-input>
    <span v-else>{{ item.title }}</span>

    <template #icon>
      <template v-if="editMode">
        <i class="i-ph-check hover:i-ph-check-bold" @click.stop="saveEdit" />
        <i class="i-ph-x hover:i-ph-x-bold" @click.stop="editMode = false" />
      </template>
      <template v-else>
        <i
          class="i-ph-pencil-simple hover:i-ph-pencil-simple-bold"
          @click.stop="setEditModeOn"
        />
        <i
          class="i-ph-trash-simple hover:i-ph-trash-simple-bold ml-1"
          @click.stop="$emit('remove')"
        />
      </template>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { InputInst } from 'naive-ui';
import { ChatSession, useChatStore } from '~~/stores/chat';

const chatStore = useChatStore();
const props = defineProps<{ item: ChatSession }>();
const emit = defineEmits<{
  (e: 'changeTitle', title: string): void;
  (e: 'remove'): void;
}>();
const editMode = ref(false);
const title = ref(props.item.title);
const input = ref<InputInst | null>(null);

function changeChat() {
  chatStore.chatSession = props.item;
}

function saveEdit() {
  emit('changeTitle', title.value);
  editMode.value = false;
}

function setEditModeOn() {
  editMode.value = true;

  until(input)
    .not.toBeNull()
    .then(() => input.value!.select());
}
</script>

<style scoped>
.big-icon {
  --n-icon-size: 2.8rem !important;
}

.inline-input {
  --n-border: 0 !important;
  --n-border-hover: 0 !important;
  --n-border-disabled: 0 !important;
  --n-border-focus: 0 !important;
  --n-box-shadow-focus: none !important;
  --n-padding-left: 0 !important;
  --n-padding-right: 0 !important;
}
</style>
