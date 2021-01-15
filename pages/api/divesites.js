import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const divesites = await db.collection("divesites").find({}).toArray();
  res.json(divesites);
};
