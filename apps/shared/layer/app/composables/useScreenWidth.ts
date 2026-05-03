export function useScreenWidth() {
  const width = ref(0);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    updateWidth(); 
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { width };
}