import {
    diff,
    diffConfig,
  } from "./processors";
  
  const configs = {
    diff: diffConfig,
  };
  const processors = { diff };
  
  module.exports = { configs, processors };
  
  export { configs, processors };
  