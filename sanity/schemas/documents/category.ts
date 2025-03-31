import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { BookA } from "lucide-react";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: BookA,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the HR category",
    }),
    defineField({
      name: "isCoreService",
      title: "Core HR Service",
      type: "boolean",
      description: "Mark if this is a core HR service category",
      initialValue: false,
    }),
    orderRankField({ type: "category" }),
  ],
});
