export type MaybeRefs<T> = Ref<T> | undefined

export function useOrCreateRef<T>(maybeRef: MaybeRefs<T>, fallback: T): Ref<T> {
 if (isRef(maybeRef)) {
    return maybeRef;
  }
  return toRef(fallback) as unknown as Ref<T>;
}