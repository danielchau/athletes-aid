import * as React from "react";
import Bar from "../containers/TopBarContainer";

export interface HelloProps {
    compiler: string;
    framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <Bar />;
    }
}
