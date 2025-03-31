import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2024-10-31",
  useCdn: false,
});

const hrCategories = [
  {
    title: "Recruitment Strategies",
    description: "Best practices for attracting and hiring top talent",
    isCoreService: true
  },
  {
    title: "Employee Engagement",
    description: "Techniques for improving workplace satisfaction and retention",
    isCoreService: true
  },
  {
    title: "HR Compliance",
    description: "Ensuring adherence to employment laws and regulations",
    isCoreService: true
  },
  {
    title: "Workplace Culture",
    description: "Building positive and productive work environments",
    isCoreService: false
  },
  {
    title: "Performance Management",
    description: "Systems for evaluating and developing employee performance",
    isCoreService: false
  }
];

async function createHrCategories() {
  for (const category of hrCategories) {
    const existing = await client.fetch(
      `*[_type == "category" && title == "${category.title}"][0]`
    );

    if (!existing) {
      await client.create({
        _type: "category",
        ...category
      });
      console.log(`Created category: ${category.title}`);
    } else {
      console.log(`Category exists: ${category.title}`);
    }
  }
}

createHrCategories().catch(console.error);
