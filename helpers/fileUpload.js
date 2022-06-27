exports.configExpressFileUpload = {
  limits: { fileSize: process.env.FILESIZE },
  abortOnLimit: process.env.ABORTONLIMITS,
  responseOnLimit: process.env.RESPONSEONLIMITS,
};


