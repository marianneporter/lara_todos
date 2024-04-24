import { onMounted, onUnmounted, ref } from 'vue'

export function useHandleScreenWidth() {  
     
    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    const screenWidth = ref(window.innerWidth);
    
    const handleResize = () => screenWidth.value = window.innerWidth;        
  
    return { screenWidth, handleResize };
}
