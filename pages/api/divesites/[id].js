import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";
export default async (req, res) => {
  //   debugger;
  //   console.log(req);
  //   console.log("---------------");
  //   console.log(res);
  const { db } = await connectToDatabase();
  const diveId = req.query.id || null;

  if (req.method === "GET") {
    console.log(diveId);
    const divesite = await db
      .collection("divesites")
      .find({ "_id": ObjectId(diveId) })
      .toArray();
    res.json(divesite);
  } else if (req.method === "POST") {
    const data = req.body;

    const divesite = await db.collection("divesites").update(
      { "_id": ObjectId(diveId) },
      {
        name: data.name,
        description: data.description,
        boundaryPoints: data.boundaryPoints,
      },
      (err, result) => {
        debugger;
      },
    );

    res.send(JSON.stringify({ Message: "That was a post!" }));
  }
};
