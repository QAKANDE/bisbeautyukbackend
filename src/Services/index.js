const express = require("express");
const router = express.Router();
const servicesModel = require("../Services/schema");
const videosModel = require("../Services/videosSchema");

router.get("/", async (req, res) => {
  try {
    const services = await servicesModel.find();
    res.send(services);
  } catch (error) {
    console.log(error);
  }
});
router.get("/get-by-service/:id", async (req, res) => {
  try {
    const serviceFound = await servicesModel.findById(req.params.id);
    res.send(serviceFound);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all-images", async (req, res) => {
  const imagesUpdate = [];
  try {
    const fullGlam = await servicesModel.findById("6186bada7ec60043136b45d1");
    const naturalGlam = await servicesModel.findById(
      "6186b835ae82573f46d767ba"
    );
    const softGlam = await servicesModel.findById("6186bba27ec60043136b45dc");

    fullGlam.images.map((im) => {
      imagesUpdate.push({ serviceName: "Full glam", url: im.url });
    });
    naturalGlam.images.map((im) => {
      imagesUpdate.push({ serviceName: "Natural glam", url: im.url });
    });
    softGlam.images.map((im) => {
      imagesUpdate.push({ serviceName: "Soft glam", url: im.url });
    });

    res.send({
      data: imagesUpdate,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all-videos", async (req, res) => {
  const videosUpdate = [];
  try {
    const fullGlam = await videosModel.findById("621b9c75246585f46986cb2d");
    const naturalGlam = await videosModel.findById("621b9c60246585f46986cb2b");
    const softGlam = await videosModel.findById("621b9b9e246585f46986cb29");

    fullGlam.videos.map((im) => {
      videosUpdate.push({ serviceName: "Full glam", url: im.url });
    });
    naturalGlam.videos.map((im) => {
      videosUpdate.push({ serviceName: "Natural glam", url: im.url });
    });
    softGlam.videos.map((im) => {
      videosUpdate.push({ serviceName: "Soft glam", url: im.url });
    });

    res.send({
      data: videosUpdate,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/new-video", async (req, res) => {
  try {
    const { url, serviceName } = req.body;
    let allServices = await videosModel.find();
    const serviceFound = allServices.filter(
      (service) => service.serviceName === serviceName
    );
    if (serviceFound.length === 0) {
      const newService = await videosModel.create({
        serviceName,
        videos: [{ url }],
      });
      return res.status(201).send(newService);
    } else {
      const serviceId = serviceFound[0]._id;
      let serviceById = await videosModel.findById(serviceId);
      if (serviceById && serviceFound.length !== 0) {
        serviceById.videos.push({ url });
        serviceById = await serviceById.save();
        res.send("New service image added");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/new-service", async (req, res) => {
  try {
    const { url, serviceName, price, pricePerHour, desc, features } = req.body;
    // const newFeatureArr = [];
    // const featureArr = features.split(",");
    // featureArr.map((feat) => {
    //   newFeatureArr.push({ text: feat });
    // });
    let allServices = await servicesModel.find();
    const serviceFound = allServices.filter(
      (service) => service.serviceName === serviceName
    );
    if (serviceFound.length === 0) {
      const newService = await servicesModel.create({
        serviceName,
        price,
        pricePerHour,
        desc,
        features: newFeatureArr,
        images: [{ url }],
      });
      return res.status(201).send(newService);
    } else {
      const serviceId = serviceFound[0]._id;
      let serviceById = await servicesModel.findById(serviceId);
      if (serviceById && serviceFound.length !== 0) {
        serviceById.images.push({ url });
        serviceById = await serviceById.save();
        res.send("New service image added");
      }
    }
    // if (allServices.length === 0) {
    //   const newService = await servicesModel.create({
    //     serviceName,
    //     price,
    //     pricePerHour,
    //     desc,
    //     features: newFeatureArr,
    //     images: [{ url }],
    //   });
    //   return res.status(201).send(newService);
    // } else {
    //   const serviceFound = allServices.filter(
    //     (service) => service.serviceName === serviceName
    //   );
    //   const serviceId = serviceFound[0]._id;
    //   let serviceById = await servicesModel.findById(serviceId);
    //   if (serviceById && serviceFound.length !== 0) {
    //     serviceById.images.push({ url });
    //     serviceById = await serviceById.save();
    //     res.send("New service image added");
    //   }
    // }

    // if (serviceById && serviceFound.length !== 0) {
    //   serviceById.images.push({ url });
    //   serviceById = await serviceById.save();
    //   res.send("New service image added");
    // } else {
    //   const newService = await servicesModel.create({
    //     serviceName,
    //     price,
    //     pricePerHour,
    //     desc,
    //     features: newFeatureArr,
    //     images: [{ url }],
    //   });
    //   return res.status(201).send(newService);
    // }
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit-service/:id", async (req, res) => {
  try {
    const servicesToBeEdited = await servicesModel.findByIdAndUpdate(
      req.params.id
    );
    res.send(servicesModel);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
