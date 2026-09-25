import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page apart from /catalog and the payment API is prerendered at build time.
// Serve those prerendered pages straight from static assets instead of rendering
// them again on each request, which was pushing the Worker over its CPU limit.
// The site never revalidates pages (new stock means a new deploy), so a read-only
// cache is enough. See https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
