import { type MaybeRefs, useOrCreateRef } from "#layers/shared-layer/app/utils/useOrCreateRef";
interface Op {
    endpoint?: MaybeRefs<string>;
    payload?: MaybeRefs<string>;
}
export function useDemoApi(options: Op = {}) {
    const endpoint = useOrCreateRef(options.endpoint, '/demo/lookup');
    const payload = useOrCreateRef(options.payload, '8.8.8.8');
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();

    const data = ref();
    const error = ref();
    const loading = ref();


    const execute = async () => {
        loading.value = true;
        error.value = undefined;
        try {

            const res = await executeRequest(endpoint.value, 'POST', { input: payload.value }, {}, {}, {event, fetcher, headers});
            if (!res.ok) {
                error.value = res.reason;
                data.value = undefined;
                return;
            }
            data.value = res;
            return;
        } finally {
            loading.value = false;
        }

    };


    return {
        execute,
        data,
        error,
        loading,

        endpoint, 
        payload
    };
    
}