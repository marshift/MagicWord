import type { Rewrite } from './define';
import * as strawberry from '@marshift/strawberry';

export type ModifyRequest = typeof modifyReq;
export type ModifyResponse = typeof modifyRes;

function modifyReq(req: Request, options: RequestInit & { url?: string; }): Request {
	return new Request(options.url ?? req.url, {
		// There must be a better way than manually putting every field here, but that's left as an exercise to the reader
		body: req.body,
		cache: req.cache,
		credentials: req.credentials,
		headers: req.headers,
		integrity: req.integrity,
		keepalive: req.keepalive,
		method: req.method,
		mode: req.mode,
		// The priority attribute is not exposed, so we can't pass that
		redirect: req.redirect,
		referrer: req.referrer,
		referrerPolicy: req.referrerPolicy,
		signal: req.signal,
		...options,
	});
}

function modifyRes(res: Response, options: ResponseInit & { body?: BodyInit }): Response {
	return new Response(options.body ?? res.body, {
		headers: res.headers,
		status: res.status,
		statusText: res.statusText,
		...options,
	});
}

function match(match: Rewrite['match'], url: string) {
	if (match instanceof RegExp) return match.test(url);
	if (typeof match === 'string') return match === url;
	throw new Error('Unknown match ' + match);
}

function getRewrites(url: string): Rewrite[] {
	const rewrites: Rewrite[] = [];

	for (const key in MagicWord.extensions) {
		const ext = MagicWord.extensions[key];
		if (ext.rewrites === undefined) continue;
		for (const rewrite of ext.rewrites) {
			if (match(rewrite.match, url)) rewrites.push(rewrite);
		}
	}

	return rewrites;
}

strawberry.instead(window, 'fetch', async ([resource, options], orig) => {
	let request = resource instanceof Request ? resource : new Request(resource, options);
	const rewrites = getRewrites(request.url);

	for (const rewrite of rewrites) {
		if (rewrite.instead) {
			return rewrite.instead(request);
		}
	}

	for (const rewrite of rewrites) {
		if (rewrite.before) {
			// Note that even if a rewrite changes the URL, only the rewrites on the old url will be applied
			request = rewrite.before(request, modifyReq);
		}
	}

	let response = await orig(request);

	for (const rewrite of rewrites) {
		if (rewrite.after) {
			response = await rewrite.after(request, response, modifyRes);
		}
	}

	return response;
});
