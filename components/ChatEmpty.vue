<template>
  <main class="flex flex-col justify-center items-center text-center">
    <h1 class="text-3xl font-bold">
      {{ $t('CHATGPT_WEBUI') }}
    </h1>

    <div class="grid grid-cols-3 pt-20 gap-8 w-full md:max-w-2xl lg:max-w-3xl">
      <div v-for="example in examples" :key="example.title" class="text-center">
        <Icon :name="example.icon" size="1.7rem" />
        <h4 class="text-lg font-bold pb-3 pt-1">
          {{ example.title }}
        </h4>

        <n-space size="large" vertical>
          <n-card
            v-for="textExample in example.examples"
            :key="textExample"
            :bordered="false"
            content-style="padding: 0;"
            class="text-sm px-3 py-3"
          >
            "{{ $t(textExample) }}"
          </n-card>

          <n-card
            v-for="desc in example.descriptions"
            :key="desc"
            :bordered="false"
            content-style="padding: 0;"
            class="text-sm px-3 py-3"
          >
            {{ desc }}
          </n-card>
        </n-space>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const examples = [
  {
    icon: 'ph:chats',
    title: 'Examples',
    examples: [
      'Explain quantum computing in simple terms',
      "Got any creative ideas for a 10 year old's birthday ?",
      'How do I make an HTTP request in Javascript ?',
    ],
  },
  {
    icon: 'ph:lightning',
    title: 'Capabilities',
    descriptions: [
      'Remembers what user said earlier in the conversation',
      'Allows user to provide follow-up corrections',
      'Trained to decline inappropriate requests',
    ],
  },
  {
    icon: 'ph:warning',
    title: 'Limitations',
    descriptions: [
      'May occasionally generate incorrect information',
      'May occasionally produce harmful instructions or biased content',
      'Limited knowledge of world and events after 2021',
    ],
  },
];
</script>
