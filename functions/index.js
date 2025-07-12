// ----------- Core Imports -----------
const { setGlobalOptions } = require("firebase-functions/v2");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// ----------- Initialize Firebase Admin SDK -----------
initializeApp();
const firestore = getFirestore();

// ----------- Secret Definition -----------
const BACKEND_API_URL = defineSecret("BACKEND_API_URL");

// ----------- Global Function Settings -----------
setGlobalOptions({
  region: "asia-southeast2",
  maxInstances: 10,
});

// ----------- Firestore Trigger Function -----------
exports.handleNewVideoRequest = onDocumentCreated(
  {
    document: "videos/{docId}",
    secrets: [BACKEND_API_URL],
  },
  async (event) => {
    const docId = event.params.docId;
    const data = event.data?.data();

    if (!data) {
      logger.error("No data found in Firestore trigger");
      return;
    }

    const {
      productImage: imageUrl,
      productName,
      language,
      productDescription: description,
      price,
      promotion,
      audience,
    } = data;

    logger.info("Triggering video generation function", {
      docId,
      imageUrl,
      productName,
      description,
    });

    if (!imageUrl || !productName || !description) {
      logger.warn("Missing required fields in Firestore document");
      await firestore.collection("videos").doc(docId).update({
        status: "error",
        errorMessage: "Missing required fields",
      });
      return;
    }

    try {
      const fetch = (await import("node-fetch")).default;

      const response = await fetch(BACKEND_API_URL.value(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productImage: imageUrl,
          productName,
          productDescription: description,
          language,
          price,
          promotion,
          audience,
          docId,
        }),
      });

      const result = await response.json();

      if (response.ok && result.videoUrl) {
        logger.info("Video generation complete. Updating Firestore document.", { docId });

        await firestore.collection("videos").doc(docId).update({
          videoUrl: result.videoUrl,
          status: "completed",
        });
      } else {
        logger.error("Video generation failed at server", { result });

        await firestore.collection("videos").doc(docId).update({
          status: "error",
          errorMessage: result.error || "Unknown error from server",
        });
      }
    } catch (err) {
      logger.error("Error calling video generation backend", err);

      await firestore.collection("videos").doc(docId).update({
        status: "error",
        errorMessage: err.message || "Network/server error",
      });
    }
  }
);
