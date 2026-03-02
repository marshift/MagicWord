import type { ModifyRequest, ModifyResponse } from './fetch';

export type Replacer = string | ((substring: string, ...args: any[]) => string);

export interface Patch {
	find: RegExp | string;
	replace: Replacer;
}

export interface Rewrite {
	match: RegExp | string;
	/**
	 * Return a response, sidestepping the `fetch` call entirely. The original, unmodified `fetch` function is also provided.
	 *
	 * Runs before `before` and `after` (which don't get to run if an `instead` is executed). The first `instead` that matches will trigger, and the rest will be silently ignored.
	 */
	instead?: (req: Request, fetch: Window['fetch']) => Response;
	/**
	 * Modify the request before it gets processed by `fetch`.
	 *
	 * All `before`s that match the original URL will execute in order. Modifying the URL won't change what hooks get executed.
	 */
	before?: (req: Request, modify: ModifyRequest) => Request;
	/**
	 * Modify the response from `fetch` before it gets returned.
	 *
	 * All `after`s that match the original URL (before being modified by `before`) will execute in order.
	 */
	after?: (req: Request, res: Response, modify: ModifyResponse) => Promise<Response>;
}

export interface Extension {
	patches?: Patch[];
	rewrites?: Rewrite[];
	post?: () => void;
	manifest: {
		name: string;
		description: string;
		authors: string[];
	};
	core?: boolean;
}

export const defineExtension = <T extends Extension>(ext: T) => ext;
