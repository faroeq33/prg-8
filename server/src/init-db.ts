import { AzureOpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
export const initiateDatabase = async () => {
  const embedder = new AzureOpenAIEmbeddings({
    azureOpenAIApiEmbeddingsDeploymentName:
      process.env.AZURE_EMBEDDING_DEPLOYMENT_NAME,
  });

  // Load text from a file
  const loader = new TextLoader("src/documents/schedule.txt");
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const timestamp = new Date().toLocaleTimeString("nl-NL", { hour12: false });
  const splitDocs = await textSplitter.splitDocuments(docs);
  console.log(
    `\n Document split into ${splitDocs.length} chunks. \n Now saving into vector store at ${timestamp}`
  );

  const vectorStore = await FaissStore.fromDocuments(splitDocs, embedder);

  // Saved in a directory called src/database
  await vectorStore.save("src/database");

  return vectorStore;
};
