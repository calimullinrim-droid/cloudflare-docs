/**
 * Synthetic, but representative, documentation page content used by the
 * benchmarks. Shapes mirror what the Astro/Starlight build feeds into the
 * rehype plugins and the `~/util/props` helpers.
 */

function section(i: number): string {
	return `
<h2>Configure feature ${i}</h2>
<p>Use the <a href="/workers/configuration/">Workers configuration</a> or the <a href="https://developers.cloudflare.com/api/">Cloudflare API</a> to set up feature ${i}. Refer to <a href="https://github.com/cloudflare/workers-sdk">workers-sdk</a> for more details &amp; examples.</p>
<h3>Prerequisites for step ${i}</h3>
<ul>
	<li><p>An active <strong>Cloudflare</strong> account &mdash; <a href="/fundamentals/account/">create one</a>.</p></li>
	<li><p>The <code>wrangler</code> CLI, version 4 or later.</p></li>
	<li><p>Access to the <a href="https://dash.cloudflare.com/"><img src="/icons/dash.svg" alt="dashboard"></a> dashboard.</p></li>
</ul>
<h3>Run the command for step ${i}</h3>
<pre><code class="language-sh">npx wrangler deploy --name feature-${i}</code></pre>
<p>Diagram of the request flow:</p>
<pre><code class="language-mermaid">flowchart LR
	A[Client] --> B[Cloudflare edge ${i}]
	B --> C[Origin]</code></pre>
<table><thead><tr><th>Setting</th><th>Value</th></tr></thead>
<tbody><tr><td><code>timeout</code></td><td>${i * 10}s</td></tr><tr><td><code>retries</code></td><td>${i % 5}</td></tr></tbody></table>
<h4>Notes</h4>
<p>Feature ${i} is available on all plans. See <a href="/plans/">plans</a>.</p>
`;
}

export function makeHtml(sections: number): string {
	return (
		`<p>This page explains how to configure &quot;features&quot; on Cloudflare.</p>` +
		Array.from({ length: sections }, (_, i) => section(i)).join("\n")
	);
}

export const smallHtml = makeHtml(3);
export const largeHtml = makeHtml(10);

function markdownSection(i: number): string {
	return `
## Configure feature ${i}

Use the [Workers configuration](/workers/configuration/) or the **Cloudflare API** to set up _feature ${i}_.

- Item \`one\` for ${i}
- Item [two](https://example.com/${i})

\`\`\`sh
npx wrangler deploy --name feature-${i}
\`\`\`
`;
}

export const shortMarkdown =
	"Learn how to **configure** [Cloudflare Workers](/workers/) with `wrangler` and _custom_ domains.";
export const longMarkdown = Array.from({ length: 15 }, (_, i) =>
	markdownSection(i),
).join("\n");
