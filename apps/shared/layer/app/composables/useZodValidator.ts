import { z, type ZodType } from 'zod';



export const useZodValidator = <T extends ZodType>(schema: T, input: unknown): {success: boolean, data?: z.infer<T>, errors?: object} => {
    const errors = ref<Record<string, string>>({});
    errors.value = {}; 
    const results = schema.safeParse(input);
    if (results.error) {
       for (const issue of results.error.issues) {
        const fieldName = issue.path.join('.');
        const errorMsg = issue.message;

        if (typeof fieldName === 'string') {
                errors.value[fieldName] = errorMsg;
        }

       }
       return {success: false, errors: errors.value};
    }
    return {success: true, data: results.data};
};