import { OpenAI } from "langchain/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/openai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import * as dotenv from 'dotenv'
dotenv.config()

export const injest_docs = async() => {
  const loader = new PDFLoader("lara_user_manual.pdf");
  const docs = await loader.load();
  console.log('docs loaded')
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const docOutput = await textSplitter.splitDocuments(docs)
  let vectorStore = await FaissStore.fromDocuments(
    docOutput,
    new OpenAIEmbeddings(),
    )
    console.log('saving...')

    const directory = "C:/Users/gabor.solteszkeri/Desktop/WORK/openAiPdfChatbot";
    await vectorStore.save(directory);
    console.log('saved!')

}

injest_docs()