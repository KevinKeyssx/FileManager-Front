import { QueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';

export const load = async () => {
	const queryClient = new QueryClient( {
		defaultOptions : {
			queries : {
				enabled : browser,
				retry   : 2,
			},
		},
	} );

	return { queryClient };
};
