import { bench, describe } from "vitest";

import { isExternalRedirect, resolveRedirect } from "~/util/redirects";

// Paths taken from `public/__redirects` to exercise each lookup strategy.
const staticPaths = [
	"/cloudflare-one/identity/",
	"/cloudflare-one/applications/",
	"/cloudflare-one/connections/",
	"/fundamentals/reference/the-internet/",
];
const dynamicPaths = [
	"/ai-gateway/providers/openai/",
	"/changelog/2025-01-01-some-post/",
	"/docs-engine/anything/",
];
const unmatchedPaths = [
	"/workers/",
	"/r2/buckets/create-buckets/",
	"/this/path/does/not/exist/",
];

describe("resolveRedirect", () => {
	bench("static rules", () => {
		for (const path of staticPaths) resolveRedirect(path);
	});

	bench("dynamic (splat) rules", () => {
		for (const path of dynamicPaths) resolveRedirect(path);
	});

	bench("no matching rule", () => {
		for (const path of unmatchedPaths) resolveRedirect(path);
	});
});

describe("isExternalRedirect", () => {
	bench("mixed paths", () => {
		for (const path of [...staticPaths, ...dynamicPaths, ...unmatchedPaths]) {
			isExternalRedirect(path);
		}
	});
});
