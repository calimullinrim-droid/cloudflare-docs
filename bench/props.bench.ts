import { bench, describe } from "vitest";

import { generateDescription, generateTableOfContents } from "~/util/props";

import { largeHtml, longMarkdown, shortMarkdown, smallHtml } from "./fixtures";

describe("generateTableOfContents", () => {
	// The table of contents is generated from rendered HTML, which already has
	// heading ids at that point.
	const withIds = (html: string) => {
		let n = 0;
		return html.replace(/<h([23])>/g, (_, d) => `<h${d} id="heading-${n++}">`);
	};
	const small = withIds(smallHtml);
	const large = withIds(largeHtml);

	bench("small page", async () => {
		await generateTableOfContents(small);
	});

	bench("large page", async () => {
		await generateTableOfContents(large);
	});
});

describe("generateDescription", () => {
	bench("from short markdown", async () => {
		await generateDescription({ markdown: shortMarkdown });
	});

	bench("from long markdown", async () => {
		await generateDescription({ markdown: longMarkdown });
	});

	bench("from large html", async () => {
		await generateDescription({ html: largeHtml });
	});
});
