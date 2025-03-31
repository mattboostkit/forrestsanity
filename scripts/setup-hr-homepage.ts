import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_STUDIO_TOKEN,
  apiVersion: "2024-10-31",
  useCdn: false,
});

const homepageContent = {
  _type: "page",
  title: "The Forrest Group - HR Consultancy",
  slug: { current: "index" },
  blocks: [
    {
      _type: "hero-1",
      heading: "Expert HR Solutions for Your Business",
      subheading: "Tailored human resource strategies to grow and protect your organisation",
      buttons: [
        {
          _type: "button",
          text: "Our Services",
          link: "/services"
        },
        {
          _type: "button",
          text: "Contact Us",
          variant: "secondary",
          link: "/contact"
        }
      ]
    },
    {
      _type: "section-header",
      heading: "Our HR Services",
      subheading: "Comprehensive solutions for businesses of all sizes"
    },
    {
      _type: "grid-row",
      items: [
        {
          _type: "grid-card",
          title: "Recruitment",
          text: "Attract and retain top talent with our strategic hiring solutions"
        },
        {
          _type: "grid-card",
          title: "Compliance",
          text: "Stay protected with up-to-date employment law guidance"
        },
        {
          _type: "grid-card",
          title: "Training",
          text: "Develop your team with our bespoke training programmes"
        }
      ]
    }
  ]
};

async function setupHomepage() {
  const existing = await client.fetch(
    `*[_type == "page" && slug.current == "index"][0]`
  );

  if (existing) {
    await client.patch(existing._id)
      .set(homepageContent)
      .commit();
    console.log("Updated homepage content");
  } else {
    await client.create(homepageContent);
    console.log("Created homepage content");
  }
}

setupHomepage().catch(console.error);
