import cacheManager from "cache-manager";
import fsStore from "cache-manager-fs";

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: ".apicache/"
  }
});

export default diskCache;
