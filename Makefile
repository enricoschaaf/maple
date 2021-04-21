install:
	deno cache deps.ts
dev:
	cd app && deno run --watch -A --unstable index.ts
start:
	cd app && deno run --unstable --allow-net --allow-read=public index.ts
test:
	deno test
lint:
	deno lint --unstable
format:
	deno fmt