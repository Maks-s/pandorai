import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai';
import { defineStore } from 'pinia';

export enum ChatMessageAuthor {
  USER,
  AI,
  SYSTEM,
}

export interface ChatMessage {
  author: ChatMessageAuthor;
  content: string;
  id?: string;
}

export interface ChatSession {
  messages: ChatMessage[];
  title: string;
}

const chatMessageToOpenaiFormat = (msg: ChatMessage) => {
  let role: ChatCompletionRequestMessageRoleEnum;
  switch (msg.author) {
    case ChatMessageAuthor.AI:
      role = ChatCompletionRequestMessageRoleEnum.Assistant;
      break;

    case ChatMessageAuthor.SYSTEM:
      role = ChatCompletionRequestMessageRoleEnum.System;
      break;

    case ChatMessageAuthor.USER:
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

// Convert our dialogue representation to OpenAI's one
function chatSessionToOpenaiFormat(
  messages: ChatMessage[]
): ChatCompletionRequestMessage[] {
  const lastSystemMsg = findLast(
    messages,
    (v) => v.author === ChatMessageAuthor.SYSTEM
  );

  const chatFormat: ChatCompletionRequestMessage[] = [];
  if (lastSystemMsg) {
    chatFormat.push(chatMessageToOpenaiFormat(lastSystemMsg));
  }

  chatFormat.push(
    ...messages
      .filter((v) => v.author !== ChatMessageAuthor.SYSTEM)
      .map((msg) => chatMessageToOpenaiFormat(msg))
  );

  return chatFormat;
}

function createChatSession(): ChatSession {
  return {
    messages: [],
    title: 'New dialogue',
  };
}

export const useChatStore = defineStore('chat', () => {
  // Use ref because we need to often need to replace the whole ChatSession
  const chatSession = ref(createChatSession());
  const currentMessage = ref('');

  const getSystemMessage = computed(() => {
    return findLast(
      chatSession.value.messages,
      (v) => v.author === ChatMessageAuthor.SYSTEM
    );
  });

  function sendMessage(sendHistory = true) {
    currentMessage.value = currentMessage.value.trim();

    if (!currentMessage.value) {
      return;
    }

    const messages: ChatMessage[] = [
      {
        author: ChatMessageAuthor.USER,
        content: currentMessage.value,
      },
      {
        author: ChatMessageAuthor.AI,
        content: '',
      },
    ];

    chatSession.value.messages.push(...messages);

    // Insert system message when sending without history
    if (!sendHistory && getSystemMessage.value) {
      messages.unshift(getSystemMessage.value);
    }

    OpenAI.sendMessage({
      conversation: chatSessionToOpenaiFormat(
        sendHistory ? chatSession.value.messages : messages
      ).slice(0, -1), // Remove last empty message

      chunk(chunk) {
        const lastMsg =
          chatSession.value.messages[chatSession.value.messages.length - 1];
        lastMsg.content += chunk;
      },
    });

    currentMessage.value = '';
  }

  function setSystemMessage(txt: string) {
    const lastMsg =
      chatSession.value.messages[chatSession.value.messages.length - 1];

    if (lastMsg?.author === ChatMessageAuthor.SYSTEM) {
      lastMsg.content = txt;
      return;
    }

    chatSession.value.messages.push({
      author: ChatMessageAuthor.SYSTEM,
      content: txt,
    });
  }

  function resetChatSession() {
    chatSession.value = createChatSession();
  }

  const isEmpty = computed(() => !chatSession.value.messages.length);

  return {
    currentMessage,
    getSystemMessage,
    isEmpty,
    chatSession,
    resetChatSession,
    sendMessage,
    setSystemMessage,
  };
});
