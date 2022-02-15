import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("client/css"));
app.use(cors());

//port 號會由 Heroku 給予，因此不再自行指定
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.get("/getData", (req, res) => {
  //台北市各地區共同生活戶資料
  async function getData() {
    // 取資料
    console.log("A request is comming.");
    fetch(
      //"https://od.moi.gov.tw/api/v1/rest/datastore/301000000A-000082-045"
      "https://data.moi.gov.tw/MoiOD/System/DownloadFile.aspx?DATA=99D563D2-568C-4FA2-B4B0-1783453B1136"
    ).then((response) => {
      response
        .text()
        .then((population) => {
          console.log(population);
          res.send(population);
        })
        .catch((e) => {
          console.log(e.response);
        });
    });
  }
  getData();
});

app.get("*", (req, res) => {
  res.send("The URL is not exist.");
});

app.listen(port, () => {
  console.log(`the server is running on port ${port}.`);
});
