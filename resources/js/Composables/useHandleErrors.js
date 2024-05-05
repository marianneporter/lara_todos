/********************************************************/
/* Handles error messages for crud and auth components  */
/* via primevue toasts. Shows toasts, cancels toasts    */   
/* on user input if required                            */  
/********************************************************/                                       
import { ref } from 'vue'
export function useHandleErrors(toast) {

    // these control the programmatic removal of a toast
    // when it is no longer required
    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'   

    // handles errors from non auth routes
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

    // called from auth routes to handle errors from server
    const handleAuthErrors = (message) => {
            toast.add({severity:'error', 
            summary: 'Error!',                              
            detail: message,
            key: errorToastKey                   
        });            
        isErrorToastVisible.value = true
    }

    // called from components if it is required to remove an
    // error toast when the user starts typing. Generally 
    // called by using an @input on a relevent imput
    const hideErrorToast = () => {
        if (isErrorToastVisible.value) {   
            toast.remove(errorToastKey);
            isErrorToastVisible.value = false;
        }  
    }   

    return {  handleErrors, 
              handleAuthErrors,
              isErrorToastVisible,
              errorToastKey,
              hideErrorToast             
            };
}
