const form = document.querySelector(".composer");
const textarea = form.querySelector("textarea");
const messages = document.querySelector(".messages");
const hint = document.querySelector(".hint");
const newChatButton = document.querySelector(".new-chat");
const history = document.querySelector(".history");
const modelSelect = document.querySelector("#model-select");
const capabilities = document.querySelector(".capabilities");
const attachButton = document.querySelector(".attach");
const fileInput = document.querySelector(".file-input");
const attachmentPreview = document.querySelector(".attachment-preview");

let currentChatId = null;
let availableModels = [];
let selectedModel = null;
let selectedAttachment = null;

const capabilityLabels = {
  chat: "Chat",
  file: "Files",
  vision: "Vision",
  image: "Image",
  stt: "STT",
};

function resizeTextarea() {
  textarea.style.height = "34px";
  textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
}

function addMessage({ text, type = "assistant", isTyping = false, media = null }) {
  const article = document.createElement("article");
  article.className =
    "message" +
    (type === "assistant" ? " assistant" : "") +
    (isTyping ? " typing" : "");

  const inner = document.createElement("div");
  inner.className = "message-inner";

  const avatar = document.createElement("div");
  avatar.className =
    "avatar " + (type === "assistant" ? "bot-avatar" : "user-avatar");
  avatar.textContent = type === "assistant" ? "AI" : "You";

  const bubble = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.appendChild(paragraph);

  if (media?.type === "image") {
    const image = document.createElement("img");
    image.className = "generated-image";
    image.src = media.url;
    image.alt = "Generated result";
    bubble.appendChild(image);
  }

  if (media?.type === "audio") {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = media.url;
    bubble.appendChild(audio);
  }

  inner.append(avatar, bubble);
  article.appendChild(inner);
  messages.appendChild(article);
  scrollChat();
  return article;
}

function scrollChat() {
  messages.scrollTop = messages.scrollHeight;
}

function updateHint(message, isError = false) {
  hint.textContent = message;
  hint.classList.toggle("error", isError);
}

function setComposerEnabled(enabled) {
  textarea.disabled = !enabled;
  form.querySelector(".send").disabled = !enabled;
  attachButton.disabled = !enabled;
  modelSelect.disabled = !enabled;
}

function showWelcomeMessage() {
  messages.innerHTML = "";
  addMessage({
    text: "Choose a model, attach files when the option is available, and start a saved conversation.",
    type: "assistant",
  });
}

function renderHistory(chats = []) {
  history.innerHTML = "";

  if (!chats.length) {
    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "No saved chats yet.";
    history.appendChild(empty);
    return;
  }

  chats.forEach((chat) => {
    const button = document.createElement("button");
    button.className = "history-item" + (chat.id === currentChatId ? " active" : "");
    button.type = "button";
    button.dataset.chatId = chat.id;

    const icon = document.createElement("span");
    icon.className = "history-icon";
    icon.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v6h-6"/><path d="M12 7v5l3 2"/></svg>';

    const label = document.createElement("span");
    label.className = "history-label";
    label.textContent = chat.title || "Untitled chat";

    button.append(icon, label);
    button.addEventListener("click", () => loadChat(chat.id));
    history.appendChild(button);
  });
}

function updateModelControls() {
  selectedModel = availableModels.find((model) => model.id === modelSelect.value);

  capabilities.innerHTML = "";
  selectedModel?.capabilities.forEach((capability) => {
    const chip = document.createElement("span");
    chip.textContent = capabilityLabels[capability] || capability;
    capabilities.appendChild(chip);
  });

  const acceptsImage = selectedModel?.capabilities.includes("vision");
  const acceptsFiles = selectedModel?.capabilities.includes("file");
  const acceptsAudio = selectedModel?.capabilities.includes("stt");
  attachButton.hidden = !(acceptsImage || acceptsFiles || acceptsAudio);
  fileInput.accept = acceptsAudio ? "audio/*" : acceptsImage ? "image/*" : ".txt,.md,.js,.json,.html,.css,.csv";

  if (selectedAttachment && attachButton.hidden) {
    clearAttachment();
  }

  if (selectedModel?.task === "image") {
    textarea.placeholder = "Describe the image you want...";
  } else if (selectedModel?.task === "stt") {
    textarea.placeholder = "Attach an audio file to transcribe...";
  } else {
    textarea.placeholder = "Ask anything...";
  }
}

async function loadModels() {
  const response = await fetch("http://localhost:3000/api/models");

  if (!response.ok) {
    throw new Error("Unable to load model options.");
  }

  const data = await response.json();
  availableModels = data.models;
  modelSelect.innerHTML = "";

  availableModels.forEach((model) => {
    const option = document.createElement("option");
    option.value = model.id;
    option.textContent = `${model.label} - ${model.provider}`;
    modelSelect.appendChild(option);
  });

  updateModelControls();
}

async function loadChatHistory() {
  const response = await fetch("http://localhost:3000/api/chats");

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Unable to load saved chats.");
  }

  const data = await response.json();
  renderHistory(data.chats);
}

async function loadChat(chatId) {
  updateHint("Loading saved chat...");

  try {
    const response = await fetch(`http://localhost:3000/api/chats/${chatId}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "Unable to load this chat.");
    }

    const data = await response.json();
    currentChatId = data.chat.id;
    messages.innerHTML = "";

    data.chat.messages.forEach((message) => {
      addMessage({
        text: message.content,
        type: message.role === "assistant" ? "assistant" : "user",
      });
    });

    renderHistoryItemSelection();
    updateHint("Saved chat loaded.");
  } catch (error) {
    updateHint(error.message, true);
    console.error(error);
  }
}

function renderHistoryItemSelection() {
  history.querySelectorAll(".history-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.chatId === currentChatId);
  });
}

function clearAttachment() {
  selectedAttachment = null;
  fileInput.value = "";
  attachmentPreview.innerHTML = "";
}

function renderAttachment() {
  attachmentPreview.innerHTML = "";

  if (!selectedAttachment) {
    return;
  }

  const item = document.createElement("div");
  item.className = "attachment-item";
  item.textContent = selectedAttachment.name;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.setAttribute("aria-label", "Remove attachment");
  remove.textContent = "x";
  remove.addEventListener("click", clearAttachment);

  item.appendChild(remove);
  attachmentPreview.appendChild(item);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve("");
    reader.readAsText(file);
  });
}

async function handleFileSelection() {
  const file = fileInput.files?.[0];

  if (!file) {
    return;
  }

  selectedAttachment = {
    name: file.name,
    type: file.type || "text/plain",
    dataUrl: await readFileAsDataUrl(file),
    text: file.type.startsWith("text/") || /\.(txt|md|js|json|html|css|csv)$/i.test(file.name)
      ? await readFileAsText(file)
      : "",
  };

  renderAttachment();
}

async function sendChatRequest(userText) {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userText,
      chatId: currentChatId,
      modelId: selectedModel?.id,
      attachments: selectedAttachment ? [selectedAttachment] : [],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || response.statusText || "Chat request failed.");
  }

  const data = await response.json();
  currentChatId = data.chat?.id || currentChatId;
  return data;
}

async function handleSend() {
  const userText = textarea.value.trim();
  if (!userText && !selectedAttachment) {
    updateHint("Please type a message or attach a supported file.", true);
    textarea.focus();
    return;
  }

  const visibleText = userText || `Attached ${selectedAttachment.name}`;
  addMessage({ text: visibleText, type: "user" });
  textarea.value = "";
  resizeTextarea();
  updateHint("Sending your request...");
  setComposerEnabled(false);

  const typingMessage = addMessage({
    text: "Working on it...",
    type: "assistant",
    isTyping: true,
  });

  try {
    const data = await sendChatRequest(userText);
    typingMessage.remove();
    addMessage({ text: data.reply, type: "assistant", media: data.media });
    updateHint(data.chat ? "Response received and saved." : "Response received.");
    clearAttachment();
    await loadChatHistory();
  } catch (error) {
    typingMessage.remove();
    updateHint(error.message || "Unable to get a real AI response.", true);
    console.error(error);
  } finally {
    setComposerEnabled(true);
  }
}

function clearConversation() {
  currentChatId = null;
  clearAttachment();
  showWelcomeMessage();
  updateHint("New conversation started.");
  renderHistoryItemSelection();
  textarea.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSend();
});

textarea.addEventListener("input", resizeTextarea);
modelSelect.addEventListener("change", updateModelControls);
attachButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", handleFileSelection);

newChatButton.addEventListener("click", () => {
  clearConversation();
});

window.addEventListener("load", async () => {
  showWelcomeMessage();
  resizeTextarea();
  scrollChat();

  try {
    await loadModels();
    await loadChatHistory();
  } catch (error) {
    updateHint(error.message, true);
    console.error(error);
  }
});
