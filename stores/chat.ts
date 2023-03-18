import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { defineStore } from 'pinia';

export enum MessageAuthor {
  USER,
  AI,
}

export interface Message {
  author: MessageAuthor;
  content: string;
  id?: string;
}

export const useChatStore = defineStore('chat', () => {
  const messages = reactive([
    // {
    //   author: MessageAuthor.USER,
    //   content: "Yo, what's up ?",
    // },
    // {
    //   author: MessageAuthor.AI,
    //   content:
    //     "I'm fine, and you ? Just so you know, I've graduated top of my class in the navy seels, and I'm a highly trained agent with lots of gorilla warfare under his belt. Don't fuck with me, or I will fuck with you.",
    // },
  ] as Message[]);

  function messagesToConversation(): ChatCompletionRequestMessage[] {
    // Convert our message representation with OpenAI's one
    return messages.map((v) => ({
      content: v.content,
      role: ChatCompletionRequestMessageRoleEnum[
        v.author === MessageAuthor.AI ? 'Assistant' : 'User'
      ],
    }));
  }

  function sendMessage(txt: string) {
    messages.push({
      author: MessageAuthor.USER,
      content: txt,
    });

    messages.push({
      author: MessageAuthor.AI,
      content: '',
    });

    OpenAI.sendMessage({
      conversation: messagesToConversation(),

      chunk(chunk) {
        const lastMsg = messages[messages.length - 1];
        lastMsg.content += chunk;
      },
    });
  }

  const isEmpty = computed(() => !messages.length);

  return { isEmpty, messages, sendMessage };
});
