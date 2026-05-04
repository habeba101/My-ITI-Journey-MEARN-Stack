# Gen AI Day 3 Chat Project

## Project Overview

This is a practice project that demonstrates a modern AI chat experience built with a lightweight full-stack setup.

It includes:
- a Node.js + Express backend (`server.js`)
- a browser frontend UI (`index.html`, `Script.js`, `Style.css`)
- MongoDB persistence for saved chat sessions
- Hugging Face inference integration for multimodal AI capabilities
- support for chat, image generation, speech-to-text, and file attachments

## What the Project Includes

### Backend (`server.js`)
- Express server with API routes for:
  - `/api/models` to list supported models and capabilities
  - `/api/chat` to send user requests to the AI agent and save the chat
  - `/api/chats` to list recent saved chats
  - `/api/chats/:id` to load a single chat conversation
- MongoDB connection via Mongoose
- Chat and message schemas for storing conversation history
- A model catalog with options for different tasks:
  - chat
  - file-aware chat
  - vision-enabled chat
  - image generation
  - speech-to-text
- Hugging Face inference client usage for multimodal AI workflows
- attachment handling with text extraction and image/audio support

### Frontend (`index.html`, `Script.js`, `Style.css`)
- A modern chat interface with:
  - model selector
  - saved chat history panel
  - message composer
  - attachment upload and preview
  - generated image display
- Dynamic UI updates for available capabilities per selected model
- Support for starting new conversations and resuming saved chats
- browser-side file reading and context preparation for the backend

### Dependencies (`package.json`)
- `express` for the server
- `cors` for cross-origin requests
- `dotenv` for environment configuration
- `mongoose` for MongoDB interaction
- `@huggingface/inference` for connecting to Hugging Face models

## How to Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with at least:
   ```env
   HUGGINGFACE_API_TOKEN=your_token_here
   MONGODB_URI=mongodb://127.0.0.1:27017/gen_ai_day3
   PORT=3000
   ```
3. Start MongoDB locally or use a hosted MongoDB URI.
4. Run the server:
   ```bash
   npm start
   ```
5. Open `index.html` in a browser or use the hosted server app from `http://localhost:3000`.

## What the Agent Does in This Project

The AI agent is the core engine of the chat experience.

It helps by:
- receiving user messages from the frontend
- interpreting text queries and file attachments
- generating responses through Hugging Face inference
- producing images when the selected model supports image generation
- transcribing audio files when speech-to-text is selected
- returning replies and media back to the UI

The backend also saves each interaction into MongoDB so conversations can be resumed later.

## Key Features

- multimodal AI support across chat, vision, image, and STT tasks
- saved chat history with reusable conversation sessions
- attachment-aware prompts and context support
- lightweight Express API with a clean frontend
- ability to switch between several Hugging Face model options

## Why This Project is Valuable

This project is a great example of combining generative AI with practical frontend/backend architecture. It demonstrates how to:
- wire up a real AI inference service to a custom app
- manage chat state and persistence
- create a responsive browser UI for AI interactions
- support multiple model capabilities in one unified experience

## Notes

- The current setup uses a local MongoDB URI by default.
- The Hugging Face token must be set in the environment.
- The frontend and backend communicate over HTTP to exchange chat and attachment data.
