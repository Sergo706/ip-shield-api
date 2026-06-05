
export function useEarlyRegister() {
    const event = useRequestEvent();
    const fetcher = useRequestFetch();
    const headers = useRequestHeaders();
    
    const loading = ref(false);
    const toast = useToast();

    const register = async (planId: number) => {
        loading.value = true;
        try {

            const res = await executeRequest<string>('/register-waitlist', 'POST', planId as unknown as object, {}, {}, {event, headers, fetcher});
            if (res.ok) {
                toast.add({
                    title: 'Success!',
                    description: res.data,
                    color: 'success',
                    type: 'foreground',
                    duration: 10000,
            });

        } else {
            toast.add({
                title: 'Error!',
                description: res.reason,
                color: 'error',
                type: 'foreground',
                duration: 10000,
            });
        }
        return;
    } finally {
        loading.value = false;
    }
    }; 
    return {
        loading,
        register
    };
}