
const FormTypeSelectorComponent =  ({formTypeCollection, handleSelectedFormType, selectedFormType}) => {
   return <div>
    {( formTypeCollection?.length > 0 ) && 
      <form>
        <select value={selectedFormType} onChange={evt => handleSelectedFormType(evt)}>{formTypeCollection.map(formType => (<option value={formType}> { formType } </option> ))}</select>
      </form> 
    }
    </div>
};

export default FormTypeSelectorComponent;