import * as React from 'react';
import { columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';

const SelectExistingFormBuilderComponent = ({ props }) => {
    const { editExistingFormBuilderForm, pendingFormsByOutcomeId } = props;

  return (
      <> 
      <StickyHeaderTable columns={columnsQuizz} rows={ pendingFormsByOutcomeId } onRowSelectedHandler={ editExistingFormBuilderForm } />
      </>
  );
};

export default SelectExistingFormBuilderComponent;