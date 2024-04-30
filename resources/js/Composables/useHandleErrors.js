import { ref } from 'vue'

export function useHandleErrors(toast) {

    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'   

    const handleErrors = (error, action, type, name) => {
        //handle validation errors
        if (error.errorType === 'validationError')
            {                  
                toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: error.errorMessage,
                    key: errorToastKey                   
                });            
                isErrorToastVisible.value = true
           }
        else { 
            //handle any server errors    
            toast.add({severity:'error', 
                summary: 'Something went Wrong',
                detail: `Unable to ${action} ${name} ${type}`                 
            });           
        }               
    }

    const hideErrorToast = () => {
        if (isErrorToastVisible.value) {   
            toast.remove(errorToastKey);
            isErrorToastVisible.value = false;
        }  
    }   

    return {  handleErrors, 
              isErrorToastVisible,
              errorToastKey,
              hideErrorToast             
            };
}
