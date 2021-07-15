import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    ArrayInput,
    SimpleFormIterator,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
} from 'react-admin';
import { FormsCustomIterator} from "./CustomIterators";

const FormsTitle = ({ record }) => {
    return <span>Forms {record ? `"${record.title}"` : ''}</span>
}

export const FormsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const FormsEdit = props => (
    <Edit title={<FormsTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput multiline source="title" />
            <ArrayInput source="questions">
                <FormsCustomIterator />
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const FormsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput multiline source="title" />
            <ArrayInput source="questions">
                <SimpleFormIterator>
                    <NumberInput label="Question ID" source="id" />
                    <TextInput label="Question Text" source="text" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);