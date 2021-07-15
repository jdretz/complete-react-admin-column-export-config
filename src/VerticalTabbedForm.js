import React, {
    Children,
    useState,
    cloneElement,
    isValidElement
} from 'react';
import {
    FormWithRedirect
} from 'react-admin';

const CustomForm = (props) => {
    const {
        basePath,
        children,
        className,
        classes: classesOverride,
        handleSubmit,
        handleSubmitWithRedirect,
        invalid,
        mutationMode,
        pristine,
        record,
        redirect: defaultRedirect,
        resource,
        saving,
        submitOnEnter,
        tabs,
        toolbar,
        undoable,
        variant,
        margin,
        validating,
        ...rest
    } = props;

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, value) => {
        setTabValue(value);
    };

    return (
        <div>
        <form
            style={{
                display: 'flex',
                height: '450px',
                overflow: 'auto'
            }}
            // not sanitizing
            {...rest}
        >
            {cloneElement(
                tabs,
                {
                    onChange: handleChange,
                    value: tabValue,
                },
                children
            )}
            <div style={{ flexGrow: '1', padding: '16px' }}>
                {Children.map(children, (tab, index) => {
                    if (!tab) {
                        return;
                    }
                    return (
                        <div>
                            {isValidElement(tab)
                                ? cloneElement(tab, {
                                    intent: 'content',
                                    resource,
                                    record,
                                    basePath,
                                    hidden: tabValue !== index,
                                    variant: tab.props.variant || variant,
                                    margin: tab.props.margin || margin,
                                    value: index,
                                })
                                : null
                            }
                        </div>
                    );
                })}
            </div>
        </form>
                {toolbar &&
                    cloneElement(toolbar, {
                        basePath,
                        className: 'toolbar',
                        handleSubmitWithRedirect,
                        handleSubmit,
                        invalid,
                        mutationMode,
                        pristine,
                        record,
                        redirect: defaultRedirect,
                        resource,
                        saving,
                        submitOnEnter,
                        validating,
                        undoable,
                    })}

        </div>
    );
};

export const VerticalTabbedForm = (props) => (
    <FormWithRedirect
        {...props}
        render={formProps => <CustomForm {...formProps} />}
    />
)