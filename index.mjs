import express from "express";
import path from "path";
import * as url from "url";
import handler from "serve-handler";
import { MongoClient, ServerApiVersion } from "mongodb";

import UAParser from 'ua-parser-js';
const parser = new UAParser();

const { PORT, MONGODB, AUTH, IPINFO_TOKEN } = process.env;
const client = new MongoClient(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express()

app.locals.pretty = true;
app.set("views", "views");
app.set("view engine", "pug");
app.set("trust proxy", true);
app.use(express.static("public"));
app.disable("x-powered-by");
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// app.use('/files', authentication, serveIndex(__dirname + '/public/files', {'icons': true}))

app.use(async (req, res, next) => {
  await client.db("LF").collection("server-logs").insertOne({
    _timestamp: Date.now(),
    ipaddress: req.ip,
    requestou: req.originalUrl
  });
  console.log(req.ip, req.originalUrl);
next();
});

function authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      res.setHeader("WWW-Authenticate", "Basic");
      return res.sendStatus(401);
  };
  const auth = new Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  if (auth[1] == AUTH) {
      next();
  } else {
      res.setHeader("WWW-Authenticate", "Basic");
      return res.sendStatus(401);
  };
};

app.get("/files/*", authentication, async (req, res) => {
	await handler(req, res, {
		"public": "public"
	});
});

app.get('/', (req, res) => {
  res.render('index', {
    title:'LF'
  })
})

app.get('/sketches', (req, res) => {
  res.render('sketches', {
    title: "sketches",
    userIp: req.socket.remoteAddress
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    userIp: req.remoteAddress
  })
})

app.get('/blank', (req, res) => {
  const ipAddress = req.socket['x-forwarded-for'];
  res.render('blank', {
    title: "Blank test page."
  })
})

app.get('/p5', (req, res) => {
  res.render('p5', {
    title: "P5.js"
  })
})

app.get('/lf-analytics', authentication, async (req, res) => {
  const data = await client.db('LF').collection('server-logs').find({}).sort({ timestamp: -1 }).toArray();
  res.render('lf-analytics', {
      database: data
  });
});

// app.get('/clonedb', (req, res) => {
//   console.log("clonedb");
//  // delted city and state from db 
//   async function cloneCollection() {
//     try {
//       // Get a reference to the database
//       const db = client.db("LF");
  
//       // Get the source and target collections
//       const sourceCollection = db.collection("lfp-logs");
//       const targetCollection = db.collection("test-logs");
  
//       // Delete the "city" and "state" fields from the source collection documents
//       await sourceCollection.updateMany({}, { $unset: { city: "", state: "" } });
  
//       // Find all documents in the source collection
//       const documents = await sourceCollection.find().toArray();
  
//       // Insert the modified documents into the target collection
//       await targetCollection.insertMany(documents);
  
//       console.log('Collection clone completed successfully.');
//     } catch (error) {
//       console.error('An error occurred while cloning the collection:', error);
//     }
//   }
  
//   cloneCollection();




//   // async function cloneCollection() {
//   //   try {
//   //     // Get a reference to the database
//   //     const db = client.db("LF");
  
//   //     // Get the source and target collections
//   //     const sourceCollection = db.collection("lfp-logs");
//   //     const targetCollection = db.collection("test-logs");
  
//   //     // Find all documents in the source collection
//   //     const documents = await sourceCollection.find().toArray();
  
//   //     // Insert the documents into the target collection
//   //     await targetCollection.insertMany(documents);
  
//   //     console.log('Collection clone completed successfully.');
//   //   } catch (error) {
//   //     console.error('An error occurred while cloning the collection:', error);
//   //   }
//   // }
  
//   // cloneCollection();
// })  

// app.get('/dbupdate', (req, res) => {
//   console.log("dbupdate");

//   async function updateCityData() {
//     const collection = client.db("LF").collection("lfp-logs");
//     const cursor = collection.find({ city: { $exists: false }, state: { $exists: false } });
  
//     await cursor.forEach(async (doc) => {
//       const ipAddress = doc.ipaddress;
  
//       try {
//         // Retrieve city and state information from ipinfo.io API
//         const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${IPINFO_TOKEN}`);
//         const data = await response.json();
  
//         if (response.ok) {
//           const { city, region } = data;
  
//           // Update the document with the fetched city and state
//           await collection.updateOne(
//             { _id: doc._id },
//             {
//               $set: {
//                 city: city,
//                 state: region
//               }
//             }
//           );
  
//           console.log(`Updated city and state for document with IP address ${ipAddress}`);
//         } else {
//           console.error(`Failed to update city and state for document with IP address ${ipAddress}: ${data.error}`);
//         }
//       } catch (error) {
//         console.error(`Failed to update city and state for document with IP address ${ipAddress}`, error);
//       }
//     });
  
//     console.log("City and state data update completed.");
//   }
  
//   updateCityData();
  



  // async function updateCityData() {
  //   const collection = client.db("LF").collection("test-logs");
  //   const cursor = collection.find({ state: { $exists: false } });
  
  //   await cursor.forEach(async (doc) => {
  //     const ipAddress = doc.ipaddress;
  
  //     try {
  //       // Retrieve city and state information from ipinfo.io API
  //       const response = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${IPINFO_TOKEN}`);
  //       const data = await response.json();
  
  //       if (response.ok) {
  //         const { city, region } = data;
  
  //         // Update the document with the fetched city and state
  //         await collection.updateOne({ _id: doc._id }, { $set: { city: city, state: region } });
  
  //         console.log(`Updated city and state for document with IP address ${ipAddress}`);
  //       } else {
  //         console.error(`Failed to update city and state for document with IP address ${ipAddress}: ${data.error}`);
  //       }
  //     } catch (error) {
  //       console.error(`Failed to update city and state for document with IP address ${ipAddress}`, error);
  //     }
  //   });
  
  //   console.log("City and state data update completed.");
  // }
  
  // updateCityData();
// })


app.get('/larryfarmerproject', (req, res) => {
  res.render('larryfarmerproject', {
    title: "The Larry Farmer Project"
  })
})

app.get('/lfp-analytics', authentication, async (req, res) => {
  try {
    // let ipData = await (await fetch(`https://ipinfo.io/${req.ip}?token=${IPINFO_TOKEN}`)).json();
    // console.log(ipData);
    
    // if (!["AS16509", "AS14618"].includes(ipData.org.split(" ")[0])) { return res.sendStatus(404); };
    
    const data = await client.db('LF').collection('lfp-logs').find({}).sort({ timestamp: -1 }).toArray();
    
    res.render('lfp-analytics', {
      database: data
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

app.post('/lfp-logs', async (req, res) => {
	const { clickedLink } = req.body; // Assuming the clicked link is sent in the request body
	console.log(`Client clicked: ${clickedLink}`);
	// log useragent, ip, and clicked link to database
	const ipData = await (await fetch(`https://ipinfo.io/${req.ip}?token=${IPINFO_TOKEN}`)).json();
	await client.db("LF").collection("lfp-logs").insertOne({
	  _timestamp: Date.now(),
	  ipaddress: req.ip,
	  city: ipData.city,
    state: ipData.region,
	  useragent: JSON.stringify(parser.setUA(req.headers["user-agent"]).getResult()),
	  clickedlink: clickedLink
	});
	res.sendStatus(200);
});

// app.post('/lfp-logs', async (req, res) => {
//   const { clickedLink } = req.body; // Assuming the clicked link is sent in the request body
//   console.log(`Client clicked: ${clickedLink}`);
//   // log useragent, ip, and clicked link to database
//   await client.db("LF").collection("lfp-logs").insertOne({
//     _timestamp: Date.now(),
//     ipaddress: req.ip,
//     useragent: JSON.stringify(parser.setUA(req.headers["user-agent"]).getResult()),
//     clickedlink: clickedLink
//   });
//   res.sendStatus(200);
// });

app.listen(PORT, () => {
  console.log('NodeJS started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
})