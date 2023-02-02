import mongoose, { Schema } from "mongoose";

export const CommentSchema = new Schema({
  text: String,
  username: String,
  coverUrl: String,
  likes: Number,
});

export const AnimeComments = new Schema({
  animeId: Number,
  comments: [CommentSchema],
});

export const AnimeSchema = new Schema({
  id: String,
  name: String,
  description: String,
  genre: String,
  episodes: Number,
  episodesIds: Number,
  comments: AnimeComments,
});

export const Anime = mongoose.model("Anime", AnimeSchema);
