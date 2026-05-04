import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { InferenceClient } from "@huggingface/inference";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const huggingfaceToken = process.env.HUGGINGFACE_API_TOKEN;
const huggingfaceModel =
  process.env.HUGGINGFACE_MODEL || "Qwen/Qwen2.5-7B-Instruct-1M:featherless-ai";
const huggingfaceApiUrl =
  process.env.HUGGINGFACE_API_URL ||
  "https://router.huggingface.co/v1/chat/completions";
const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gen_ai_day3";
const inferenceClient = new InferenceClient(huggingfaceToken);

let modelCatalog = [
  {
    id: "qwen-chat",
    label: "Qwen 2.5 7B Instruct",
    provider: "Qwen / Featherless",
    model: "Qwen/Qwen2.5-7B-Instruct-1M:featherless-ai",
    task: "chat",
    capabilities: ["chat", "file"],
  },
  {
    id: "deepseek-r1",
    label: "DeepSeek R1",
    provider: "DeepSeek",
    model: "deepseek-ai/DeepSeek-R1",
    task: "chat",
    capabilities: ["chat", "file"],
  },
  {
    id: "gemma-3",
    label: "Gemma 3 27B IT",
    provider: "Google",
    model: "google/gemma-3-27b-it",
    task: "chat",
    capabilities: ["chat", "file"],
  },
  {
    id: "llama-3-3",
    label: "Llama 3.3 70B Instruct",
    provider: "Meta Llama",
    model: "meta-llama/Llama-3.3-70B-Instruct",
    task: "chat",
    capabilities: ["chat", "file"],
  },
  {
    id: "glm-4-5",
    label: "GLM 4.5",
    provider: "Z.ai",
    model: "zai-org/GLM-4.5",
    task: "chat",
    capabilities: ["chat", "file"],
  },
  {
    id: "aya-vision",
    label: "Aya Vision 32B",
    provider: "Cohere",
    model: "CohereLabs/aya-vision-32b",
    task: "chat",
    capabilities: ["chat", "vision"],
  },
  {
    id: "glm-vision",
    label: "GLM 4.5V Vision",
    provider: "Z.ai",
    model: "zai-org/GLM-4.5V",
    task: "chat",
    capabilities: ["chat", "vision"],
  },
  {
    id: "flux-schnell",
    label: "FLUX.1 Schnell",
    provider: "Black Forest Labs",
    model: "black-forest-labs/FLUX.1-schnell",
    task: "image",
    providerKey: "hf-inference",
    capabilities: ["image"],
  },
  {
    id: "whisper-stt",
    label: "Whisper Large v3",
    provider: "OpenAI Whisper",
    model: "openai/whisper-large-v3",
    task: "stt",
    providerKey: "hf-inference",
    capabilities: ["stt"],
  },
];

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false },
);

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", chatSchema);

function createChatTitle(message) {
  const title = message.trim().replace(/\s+/g, " ");
  return title.length > 60 ? `${title.slice(0, 57)}...` : title;
}

function createAttachmentLabel(attachments = []) {
  if (!attachments.length) {
    return "Attachment";
  }

  const names = attachments
    .map((attachment) => attachment.name)
    .filter(Boolean)
    .join(", ");

  return names || "Attachment";
}

function createUserMessageText(message, attachments = []) {
  const trimmedMessage = message.trim();

  if (trimmedMessage) {
    return trimmedMessage;
  }

  return `Attached file: ${createAttachmentLabel(attachments)}`;
}

function getModelConfig(modelId) {
  return modelCatalog.find((model) => model.id === modelId) || modelCatalog[0];
}

function getDataUrlBlob(dataUrl) {
  const [meta, base64Data] = dataUrl.split(",");
  const contentType =
    meta.match(/data:(.*?);base64/)?.[1] || "application/octet-stream";
  return new Blob([Buffer.from(base64Data, "base64")], { type: contentType });
}

async function blobToDataUrl(blob) {
  const contentType = blob.type || "application/octet-stream";
  const buffer = Buffer.from(await blob.arrayBuffer());
  return `data:${contentType};base64,${buffer.toString("base64")}`;
}

function buildAttachmentContext(attachments = []) {
  const readableFiles = attachments
    .filter((attachment) => attachment.text)
    .map(
      (attachment) =>
        `File: ${attachment.name}\n${attachment.text.slice(0, 12000)}`,
    );

  return readableFiles.length
    ? `\n\nAttached file context:\n${readableFiles.join("\n\n---\n\n")}`
    : "";
}

function buildChatContent(message, modelConfig, attachments = []) {
  const text = `${createUserMessageText(message, attachments)}${buildAttachmentContext(attachments)}`;

  if (!modelConfig.capabilities.includes("vision")) {
    return text;
  }

  const imageAttachments = attachments.filter((attachment) =>
    attachment.type?.startsWith("image/"),
  );

  if (!imageAttachments.length) {
    return text;
  }

  return [
    {
      type: "text",
      text,
    },
    ...imageAttachments.map((attachment) => ({
      type: "image_url",
      image_url: {
        url: attachment.dataUrl,
      },
    })),
  ];
}

async function connectToMongo() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

async function getChatForInteraction(chatId, userMessageText) {
  if (chatId) {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      const error = new Error("Invalid chat id.");
      error.status = 400;
      throw error;
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      const error = new Error("Chat was not found.");
      error.status = 404;
      throw error;
    }

    return chat;
  }

  return Chat.create({
    title: createChatTitle(userMessageText),
    messages: [],
  });
}

async function saveInteraction({ chatId, userMessageText, reply }) {
  const chat = await getChatForInteraction(chatId, userMessageText);

  chat.messages.push(
    {
      role: "user",
      content: userMessageText,
    },
    {
      role: "assistant",
      content: reply,
    },
  );
  await chat.save();

  return chat;
}

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.static(__dirname));

app.get("/api/models", (req, res) => {
  res.json({
    models: modelCatalog.map(({ id, label, provider, task, capabilities }) => ({
      id,
      label,
      provider,
      task,
      capabilities,
    })),
  });
});

app.post("/api/chat", async (req, res) => {
  const { message = "", chatId, modelId, attachments = [] } = req.body;
  const modelConfig = getModelConfig(modelId);
  const userMessageText = createUserMessageText(message, attachments);

  if (typeof message !== "string" || (!message.trim() && !attachments.length)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid message or attachment." });
  }

  if (!huggingfaceToken) {
    return res
      .status(500)
      .json({ error: "HUGGINGFACE_API_TOKEN is required in the environment." });
  }

  try {
    if (modelConfig.task === "image") {
      if (!message.trim()) {
        return res
          .status(400)
          .json({ error: "Please describe the image to generate." });
      }

      const imageUrl = await inferenceClient.textToImage(
        {
          model: modelConfig.model,
          provider: modelConfig.providerKey,
          inputs: message,
        },
        { outputType: "dataUrl" },
      );
      const reply = "Image generated.";
      const chat = await saveInteraction({
        chatId,
        userMessageText,
        reply,
      });

      return res.json({
        reply,
        media: {
          type: "image",
          url: imageUrl,
        },
        chat: {
          id: chat._id,
          title: chat.title,
          updatedAt: chat.updatedAt,
        },
        model: modelConfig,
      });
    }

    if (modelConfig.task === "stt") {
      const audioAttachment = attachments.find((attachment) =>
        attachment.type?.startsWith("audio/"),
      );

      if (!audioAttachment?.dataUrl) {
        return res
          .status(400)
          .json({ error: "Please attach an audio file for speech to text." });
      }

      const transcription = await inferenceClient.automaticSpeechRecognition({
        model: modelConfig.model,
        provider: modelConfig.providerKey,
        inputs: getDataUrlBlob(audioAttachment.dataUrl),
      });
      const reply = transcription.text || "No transcription returned.";
      const chat = await saveInteraction({
        chatId,
        userMessageText,
        reply,
      });

      return res.json({
        reply,
        chat: {
          id: chat._id,
          title: chat.title,
          updatedAt: chat.updatedAt,
        },
        model: modelConfig,
      });
    }

    let chat = null;
    let historyMessages = [];

    if (chatId) {
      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ error: "Invalid chat id." });
      }

      chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({ error: "Chat was not found." });
      }

      historyMessages = chat.messages.slice(-10).map((chatMessage) => ({
        role: chatMessage.role,
        content: chatMessage.content,
      }));
    }

    const response = await fetch(huggingfaceApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${huggingfaceToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelConfig.model,
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          ...historyMessages,
          {
            role: "user",
            content: buildChatContent(message, modelConfig, attachments),
          },
        ],
        max_tokens: 250,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", response.status, errorText);
      return res.status(response.status).json({
        error: "Unable to get a response from Hugging Face.",
        details: errorText,
      });
    }

    const result = await response.json();
    const reply =
      result?.choices?.[0]?.message?.content ||
      result?.[0]?.generated_text ||
      result?.generated_text ||
      "I could not generate a response.";

    if (!chat) {
      chat = await Chat.create({
        title: createChatTitle(userMessageText),
        messages: [],
      });
    }

    chat.messages.push(
      {
        role: "user",
        content: userMessageText,
      },
      {
        role: "assistant",
        content: reply,
      },
    );
    await chat.save();

    res.json({
      reply,
      chat: {
        id: chat._id,
        title: chat.title,
        updatedAt: chat.updatedAt,
      },
      model: modelConfig,
    });
  } catch (error) {
    console.error("Chat completion error:", error);
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(500)
      .json({ error: "Unable to get a response from the Hugging Face API." });
  }
});

app.get("/api/chats", async (req, res) => {
  try {
    const chats = await Chat.find({})
      .sort({ updatedAt: -1 })
      .limit(20)
      .select("title updatedAt createdAt");

    res.json({
      chats: chats.map((chat) => ({
        id: chat._id,
        title: chat.title,
        updatedAt: chat.updatedAt,
        createdAt: chat.createdAt,
      })),
    });
  } catch (error) {
    console.error("Chat history error:", error);
    res.status(500).json({ error: "Unable to load chat history." });
  }
});

app.get("/api/chats/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid chat id." });
  }

  try {
    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({ error: "Chat was not found." });
    }

    res.json({
      chat: {
        id: chat._id,
        title: chat.title,
        messages: chat.messages,
        updatedAt: chat.updatedAt,
        createdAt: chat.createdAt,
      },
    });
  } catch (error) {
    console.error("Chat review error:", error);
    res.status(500).json({ error: "Unable to load this chat." });
  }
});

connectToMongo();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
