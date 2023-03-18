import type {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from 'openai';
import { useSettingsStore } from '~~/stores/settings';

const CHAT_COMPLETION_URL = 'https://api.openai.com/v1/chat/completions';

export type OpenAIConfiguration = {
  apiKey: string;
  organizationId?: string;
};

export type SendMessageOptions = {
  conversation: ChatCompletionRequestMessage[];

  chunk?: (chunk: string) => void;
  complete?: (text: string) => void;
  error?: (e: Error) => void;
};

export const OpenAI = {
  async sendMessage(options: SendMessageOptions) {
    const settings = useSettingsStore();
    if (!settings.apiKey) {
      throw new Error('No API Key provided');
    }

    const cfg: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: options.conversation,
      stream: true,
    };

    // Use fetch to stream content because official openai module doesn't support it
    const res = await fetch(CHAT_COMPLETION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify(cfg),
    });

    if (!res.body) {
      throw new Error('No request body');
    }

    const bodyReader = res.body.getReader();
    const decoder = new TextDecoder();

    let finalText = '';
    let finished = false;
    while (!finished) {
      const { done, value } = await bodyReader.read();
      if (done) {
        break;
      }

      const data = decoder.decode(value); // .slice(6);

      for (const line of data.split('\n')) {
        // Convert to UTF-8 and remove "data: "
        const jsonText = line.slice(6).trim();

        // Empty line
        if (!jsonText) {
          continue;
        }

        // EOT
        if (jsonText === '[DONE]') {
          finished = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonText);
          // There shouldn't be multiples choices, though I'm not 100% sure
          const content = parsed.choices[0].delta.content;
          if (content) {
            if (options.chunk) {
              options.chunk(content);
            }

            finalText += content;
          }
        } catch (e) {
          const error = new Error("Couldn't parse data sent by server", {
            cause: e,
          });

          // No handlin' ? That's a paddlin'
          if (!options.error) {
            throw error;
          }

          options.error(error);
        }
      }
    }

    if (options.complete) {
      options.complete(finalText);
    }
  },
};
