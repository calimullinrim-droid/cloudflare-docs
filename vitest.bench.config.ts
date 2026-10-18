import { defineConfig } from "vitest/config";
import codspeedPlugin from "@codspeed/vitest-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), codspeedPlugin()],
	test: {
		// Prevent the root `vitest.workspace.ts` from being picked up.
		workspace: [
			{
				extends: true,
				test: {
					name: "Bench",
					include: ["bench/**/*.bench.ts"],
				},
			},
		],
	},
});
