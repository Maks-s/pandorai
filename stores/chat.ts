import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { defineStore } from 'pinia';

export interface Message {
  author: ChatCompletionRequestMessageRoleEnum;
  text: string;
}

export const useChatStore = defineStore('chat', () => {
  const messages = reactive([] as Message[]);

  function messagesToConversation(): ChatCompletionRequestMessage[] {
    // Convert our message representation with OpenAI's one
    return messages.map((v) => ({
      content: v.text,
      role: v.author,
    }));
  }

  function sendMessage(txt: string) {
    messages.push({
      author: ChatCompletionRequestMessageRoleEnum.User,
      text: txt,
    });

    OpenAI.sendMessage({
      conversation: messagesToConversation(),

      chunk(chunk) {
        console.log(chunk);
      },
    });
  }

  return { messages, sendMessage };
});
