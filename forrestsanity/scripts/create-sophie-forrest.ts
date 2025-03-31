import { createClient } from "@sanity/client";
import { authorData } from "./sophie-forrest-data";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2024-10-31",
  useCdn: false,
});

async function createSophieForrestProfile() {
  try {
    const existingAuthor = await client.fetch(
      `*[_type == "author" && slug.current == "sophie-forrest"][0]`
    );

    if (existingAuthor) {
      console.log("Sophie Forrest author profile already exists");
      return;
    }

    const result = await client.create({
      _type: "author",
      ...authorData,
    });

    console.log("Sophie Forrest author profile created:", result._id);
  } catch (error) {
    console.error("Error creating Sophie Forrest profile:", error);
  }
}

createSophieForrestProfile();
