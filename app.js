import { OpenAI } from "langchain/openai";



import express from 'express'
import http from 'http'
import { fileURLToPath } from "url";
dotenv.config()
import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const app = express();
const port = 3000;

http.createServer(app).listen(process.env.PORT)
console.info('listening on port ' + process.env.PORT)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/ask', async (req, res) => {
  try {
    const question = ""
    let answer = {};
    const llm= new OpenAI({ modelName: "gpt-3.5-turbo"});
    
    //ToDo
    
    res.json({ result: answer });
  } 
  catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});