import { FaissStore } from "@langchain/community/vectorstores/faiss";
export async function searchDocuments(
  prompt: string,
  vectorStore: FaissStore
): Promise<string> {
  try {
    const docs = await vectorStore.similaritySearch(prompt, 1);
    return docs.map((doc) => doc.pageContent).join("\n \n");
  } catch (error) {
    console.log("Vectorstore error:", error);
    return "Geen rooster beschikbaar, het rooster moet nog gemaakt worden";
  }
}
