# LawGPT - AI-Powered Legal Assistant


LawGPT is an AI-driven legal assistant designed to provide instant legal guidance, simplify complex legal concepts, and help users navigate legal matters efficiently. It leverages Retrieval-Augmented Generation (RAG) to enhance responses with document-based legal knowledge.

## Features
- **AI-Powered Legal Guidance**: Get instant answers to legal queries.
- **Legal Research**: Retrieve legal precedents, statutes, and regulations.
- **Privacy & Security**: User data is securely processed.

## Tech Stack

- Python 3.8+
- FastAPI
- Next.js (with TypeScript, Tailwind CSS, ShadCN, DrizzleORM, Clerk, NeonDB)
- HuggingFace Instruct Embeddings
- FAISS Vectorstore
- Gemini API
- Vercel


## Setup

```bash
git clone https://github.com/ayuugoyal/lawgpt

cd lawgpt

pnpm install

pnpm run dev
```

## RAG Implementation (Retrieval-Augmented Generation)

1. **Document Upload & Embeddings:**

   - Upload PDFs via FastAPI endpoint.
   - Extract text using `PyPDF2`.
   - Split text into chunks using `langchain.text_splitter`.
   - Generate embeddings using `HuggingFaceInstructEmbeddings`.
   - Store embeddings in `FAISS` vector database.

2. **Search & Retrieval:**

   - Accepts user query.
   - Encodes query using `SentenceTransformer`.
   - Searches vector store for relevant text.

3. **Chat with Gemini AI:**

   - Uses retrieved context for response generation.
   - Integrates Google Gemini API for enhanced answers.

## Live Demo
Try LawGPT live at: https://lawgpt.ayuugoyal.tech/
