import { ref } from 'vue'

export function useHandleErrors(toast) {

    const isErrorToastVisible = ref(false)
    const errorToastKey = 'errorToastKey'    
    
    // organizes form errors into an object with the 
    // key being the field name followed by the error message
    const getValidationErrors = (errors) => {
        let validationErrors = new Object()
        Object.keys(errors).forEach((inputName) => {
            validationErrors[inputName] = errors[inputName][0] 
        })
        return validationErrors
    }

    const handleErrors = (error, action, type, name) => {
        //handle validation errors
        if (error.response && error.response.status === 422 && error.response.data.errors)
            {  
                const errorObj = error.response.data.errors             
                const errorKeys = Object.keys(errorObj)
                const errorPropertyName = errorKeys[0]
                const errorForToast = errorObj[errorPropertyName][0]   
                
                toast.add({severity:'error', 
                    summary: 'Error!',                              
                    detail: errorForToast,
                    key: errorToastKey                   
            });            
            isErrorToastVisible.value = true
            return 'validationError' }
        else { 
            //handle any other errors from axios call     
            toast.add({severity:'error', 
                summary: 'Something went Wrong',
                detail: `Unable to ${action} ${name} ${type}`                 
            });
            return 'serverError'
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
              hideErrorToast,
              getValidationErrors
            };
}
