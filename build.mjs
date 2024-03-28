import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['src/index.tsx'],
    minify: true,
    bundle: true,
    format: "esm",
    platform: 'node',
    external: ["react", "ink", "prompts", "xlsx-parse-json", "xlsx", "./config.js"],
    // target: ['node21'],
    outfile: 'dist/index.js',
});