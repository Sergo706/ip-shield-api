export function usePlansData() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();
    const data = useAsyncData('plans', async () => {
        const res = await executeRequest<PublicPlans>('/plans', 'GET', {}, {}, {}, {event, headers, fetcher});
        if (!res.ok) {
            throw new Error(res.reason || 'Failed to fetch API tokens');
        }
        return res.data;
    });
    return data;
}

