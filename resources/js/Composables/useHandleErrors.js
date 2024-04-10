export function useHandleErrors() {
    
    // organizes form errors into an object with the 
    // key being the field name followed by the error message
    const getValidationErrors = (errors) => {
        let validationErrors = new Object()
        Object.keys(errors).forEach((inputName) => {
            validationErrors[inputName] = errors[inputName][0] 
        })
        return validationErrors
    }
    return { getValidationErrors };
}
