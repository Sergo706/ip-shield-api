import { type MaybeRefs, useOrCreateRef } from "#layers/shared-layer/app/utils/useOrCreateRef";


interface Ops {
    name?: MaybeRefs<string>,
    lastname?: MaybeRefs<string>
}
export function useSettings(ops: Ops = {}) {
    const name = useOrCreateRef(ops.name, '');
    const lastname = useOrCreateRef(ops.lastname, '');
    const headers = useRequestHeaders();
    const event = useRequestEvent();
    const fetcher = useRequestFetch();

    const loading = ref(false);
    const toast = useToast();

    const initEmailUpdate = async () => {
        try {
            loading.value = true;
            const result = await executeRequest<string>('/api/auth/change-email', 'POST', { "init": "1" }, {}, {}, { headers, event, fetcher });
            
            if (!result.ok) {
                toast.add({
                    title: "Error!",
                    color: 'error',
                    type: 'foreground',
                    description: "Server error. Try again later"
                });
                return;
            }
            
            toast.add({
                title: "Success!",
                color: 'success',
                type: 'foreground',
                duration: 10000,
                description: "Check your email to continue"
            });
            return;
        } finally {
            loading.value = false;
        }
    };
// update-names.post


    const updateNames = async () => {
        try {
            loading.value = true;
            const result = await executeRequest<string>('/update-names', 'POST', { firstname: name.value, lastname: lastname.value }, {}, {}, { headers, event, fetcher });
            
            if (!result.ok) {
                toast.add({
                    title: "Error!",
                    color: 'error',
                    type: 'foreground',
                    description: result.reason
                });
                return;
            }
            toast.add({
                title: "Success!",
                color: 'success',
                type: 'foreground',
                duration: 10000,
                description: result.data
            });
        } finally {
            loading.value = false;
        }
    };

    return {
        initEmailUpdate,
        updateNames,
        loading,
        name, 
        lastname,
    };
}
    