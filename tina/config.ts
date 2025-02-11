import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "News Posts",
        path: "src/content/news",
        defaultItem: () => {
          return {
            pubDate: new Date().toISOString(),
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Posted",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "partner",
        label: "Partners",
        path: "src/content/partners",
        fields: [
          {
            type: "string",
            name: "orgName",
            label: "Organization",
            // isTitle: true,
            // required: true,
          },
          {
            type: "string",
            name: "desc",
            label: "Description",
            // isBody: true,
            // required: true,
          },
          {
            type: "image",
            name: "imgSrc",
            label: "Image",
          },
        ],
      },
    ],
  },
});
