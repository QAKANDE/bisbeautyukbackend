const { model, Schema } = require("mongoose");

const videosSchema = new Schema({
  serviceName: { type: String, required: true },
  videos: [
    {
      url: { type: String, required: true },
    },
  ],
});

const videosModel = model("video-services", videosSchema);

module.exports = videosModel;
