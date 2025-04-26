import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function createVectorstore(embeddings: OpenAIEmbeddings) {
  const loader = new TextLoader("src/documents/schedule.txt");
  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log(
    `Document split into ${splitDocs.length} chunks. Now saving into vector store`
  );
  const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);

  await vectorStore.save("src/database"); // Saved in a directory called src/database
  return vectorStore;
}
