import React from "react";
import { PDSHPanelTemplate } from "./PDSHPanelTemplate";

export const GroupsStudentView = ({changeParentView}) => {
    return (
        <div>
            <PDSHPanelTemplate
                title={'Vista por estudiante'}
                canReturn={true}
                changeParentView={changeParentView}
                previousComponentIndex={0}
            />
        </div>
    )
}
