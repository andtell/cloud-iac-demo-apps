import express, { Application } from 'express';
import { readFileSync, promises as fsPromises } from 'fs';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.EXPRESS_PORT || 3000;
const VERSION = process.env.VERSION || "dev-0";

function syncReadFile(filename: string) {
  let result: string = "n/a";
  try {
    result = readFileSync(filename, 'utf-8').substring(0,8);  
    console.log(`Read ${result} from file`); // 👉️ "hello world hello world ..."
  } catch (error) {
    console.error(error);
  }
  return result;
}

const gitShortSha = syncReadFile('./git-version.txt')  

let awsVotes = 0;
let gcpVotes = 0;
let azureVotes = 0;

app.use(cors()); 
app.disable('etag');
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    theBestVersion: gitShortSha,
  });
});

app.post("/aws", (req, res) => {
  awsVotes += 1;
  res.send({
    message: `AWS got one point. Total : ${awsVotes}`,
  });
});

app.post("/gcp", (req, res) => {
    gcpVotes += 1;
    res.send({
      message: `GCP got one point. Total : ${gcpVotes}`,
    });
  });

  app.post("/azure", (req, res) => {
    azureVotes += 1;
    res.send({
      message: `Azure got one point. Total : ${azureVotes}`,
    });
  });

  app.get("/score", (req, res) => {
    res.send({
      aws: `${awsVotes}`,
      gcp: `${gcpVotes}`,
      azure: `${azureVotes}`,
    });
  });


app.listen(PORT, () => {
  console.log(`Server is running app version '${VERSION}' (Git: '${gitShortSha}') on port '${PORT}'`);
});