import React from "react";
import { PDSHPanelTemplate } from "./PDSHPanelTemplate";

export const GroupsGeneralView = ({changeParentView}) => {
    return (
        <div>
            <PDSHPanelTemplate
                title={'Vista general'}
                canReturn={true}
                changeParentView={changeParentView}
                previousComponentIndex={0}
            />
        </div>
    );
};
