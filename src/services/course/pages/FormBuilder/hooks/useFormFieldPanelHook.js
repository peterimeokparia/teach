import { 
useState } from "react";

function useFormFieldPanelHook() {

    const [ selectedFormField, setSelectedFormField ] = useState(undefined)
   
return {
    selectedFormField, 
    setSelectedFormField,
}; };

export default useFormFieldPanelHook;