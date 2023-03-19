import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { defineStore } from 'pinia';

export enum MessageAuthor {
  USER,
  AI,
  SYSTEM,
}

export interface Message {
  author: MessageAuthor;
  content: string;
  id?: string;
}

const messageToOpenAiMessage = (msg: Message) => {
  let role: ChatCompletionRequestMessageRoleEnum;
  switch (msg.author) {
    case MessageAuthor.AI:
      role = ChatCompletionRequestMessageRoleEnum.Assistant;
      break;

    case MessageAuthor.SYSTEM:
      role = ChatCompletionRequestMessageRoleEnum.System;
      break;

    case MessageAuthor.USER:
      role = ChatCompletionRequestMessageRoleEnum.User;
      break;

    default:
      throw new Error("This error shouldn't appear");
  }

  return {
    content: msg.content,
    role,
  };
};

// Convert our message representation to OpenAI's one
function messagesToConversation(
  messages: Message[]
): ChatCompletionRequestMessage[] {
  const lastSystemMsg = findLast(
    messages,
    (v) => v.author === MessageAuthor.SYSTEM
  );

  const conv: ChatCompletionRequestMessage[] = [];
  if (lastSystemMsg) {
    conv.push(messageToOpenAiMessage(lastSystemMsg));
  }

  conv.push(
    ...messages
      .filter((v) => v.author !== MessageAuthor.SYSTEM)
      .map((msg) => messageToOpenAiMessage(msg))
  );

  return conv;
}

export const useChatStore = defineStore('chat', () => {
  const messages = reactive([] as Message[]);

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
      conversation: messagesToConversation(messages),

      chunk(chunk) {
        const lastMsg = messages[messages.length - 1];
        lastMsg.content += chunk;
      },
    });
  }

  const getSystemMessage = computed(() => {
    return findLast(messages, (v) => v.author === MessageAuthor.SYSTEM);
  });

  function setSystemMessage(txt: string) {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.author === MessageAuthor.SYSTEM) {
      lastMsg.content = txt;
      return;
    }

    messages.push({
      author: MessageAuthor.SYSTEM,
      content: txt,
    });
  }

  const isEmpty = computed(() => !messages.length);

  return { getSystemMessage, isEmpty, messages, sendMessage, setSystemMessage };
});
