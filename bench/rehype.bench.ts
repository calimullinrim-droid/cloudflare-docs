import { bench, describe } from "vitest";

import { unified, type PluggableList } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

import rehypeAutolinkHeadings from "~/plugins/rehype/autolink-headings";
import rehypeBaseUrl from "~/plugins/rehype/base-url";
import rehypeExternalLinks from "~/plugins/rehype/external-links";
import rehypeFilterElements from "~/plugins/rehype/filter-elements";
import rehypeHeadingSlugs from "~/plugins/rehype/heading-slugs";
import rehypeMermaid from "~/plugins/rehype/mermaid";

import { largeHtml, smallHtml } from "./fixtures";

function processor(plugins: PluggableList) {
	return unified()
		.data("settings", { fragment: true })
		.use([rehypeParse, ...plugins, rehypeStringify])
		.freeze();
}

// Mirrors the order used by the site's markdown pipeline in astro.config.ts.
const contentPipeline = processor([
	rehypeMermaid,
	rehypeExternalLinks,
	rehypeHeadingSlugs,
	rehypeAutolinkHeadings,
]);

// Mirrors the pipeline used to produce plain/LLM-friendly HTML output.
const exportPipeline = processor([rehypeBaseUrl, rehypeFilterElements]);

describe("rehype content pipeline", () => {
	bench("small page", async () => {
		await contentPipeline.process(smallHtml);
	});

	bench("large page", async () => {
		await contentPipeline.process(largeHtml);
	});
});

describe("rehype export pipeline", () => {
	bench("large page", async () => {
		await exportPipeline.process(largeHtml);
	});
});

describe("rehype plugins (large page)", () => {
	const baseline = processor([]);
	const externalLinks = processor([rehypeExternalLinks]);
	const headingSlugs = processor([rehypeHeadingSlugs]);
	const autolinkHeadings = processor([
		rehypeHeadingSlugs,
		rehypeAutolinkHeadings,
	]);
	const mermaid = processor([rehypeMermaid]);

	bench("parse + stringify only", async () => {
		await baseline.process(largeHtml);
	});

	bench("external-links", async () => {
		await externalLinks.process(largeHtml);
	});

	bench("heading-slugs", async () => {
		await headingSlugs.process(largeHtml);
	});

	bench("heading-slugs + autolink-headings", async () => {
		await autolinkHeadings.process(largeHtml);
	});

	bench("mermaid", async () => {
		await mermaid.process(largeHtml);
	});
});
