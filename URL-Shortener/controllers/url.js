import { nanoid } from "nanoid";
import url from "../models/url.js";

export const createUrl = async (req, res) => {
  const shortId = nanoid(8);
  const body = req.body;
  console.log(body);

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  await url.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
};

export const getUrl = async (req, res) => {
  const { shortID } = req.params;
  const entry = await url.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

export const getAnalytics = async (req, res) => {
  const { shortID } = req.params;

  const matchData = await url.findOne({ shortID });

  return res.json({
    totalClicks: matchData.visitHistory.length,
    analytics: matchData.visitHistory,
  });
};
