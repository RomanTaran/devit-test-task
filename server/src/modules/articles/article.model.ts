import mongoose from 'mongoose';
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pubDate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    contentSnippet: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  });

articleSchema.plugin(toJSON);
// @ts-ignore
articleSchema.plugin(paginate)

const Article = mongoose.model('Article', articleSchema);

export default Article;
