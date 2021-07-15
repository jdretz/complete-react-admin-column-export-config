import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { TextInput, NumberInput, useNotify, useMutation } from 'react-admin';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

export const FormsCustomIterator = ({ record }) => {
    const notify = useNotify();
    const [mutate, { loading }] = useMutation({}, {
        // https://marmelab.com/react-admin/Actions.html#optimistic-rendering-and-undo
        mutationMode: 'undoable',
        onSuccess: () => {
            notify('Questions reordered', 'info', {}, true);
        },
        onFailure: (error) => notify(`Error: ${error.message}`, 'warning'),
    });

    const reorder = (newQuestions) => mutate({
        type: 'update',
        resource: 'forms',
        payload: {
            id: record.id,
            data: { questions: newQuestions }
        }
    });

    const onDragEnd = (result, provided) => {
        const {
            source,
            destination
        } = result;

        console.log("Item at index " + source.index + " is now at index " + destination.index)

        // Get the item
        const item = record.questions[source.index];

        // Remove item from array
        const newArray = record.questions.filter((el, index) => index !== source.index);

        // Insert item at destination
        newArray.splice(destination.index, 0, item)

        // Call mutation function
        reorder(newArray)
    }

    return (
        <FieldArray name="questions">
            {(fieldProps) => {
                return (
                    <DragDropContext
                        onDragEnd={onDragEnd} // modified
                    >
                        <TableContainer>
                            <Table
                                aria-label="questions list"
                            >
                                <Droppable droppableId="droppable-questions" type="QUESTION">
                                    {(provided, snapshot) => (
                                        <TableBody
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {fieldProps.fields.map((question, index) => {
                                                return (
                                                    <Draggable key={String(fieldProps.fields.value[index].id)} draggableId={String(fieldProps.fields.value[index].id)} index={index}>
                                                        {(provided, snapshot) => (
                                                            <TableRow
                                                                hover
                                                                tabIndex={-1}
                                                                key={index}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                            >
                                                                <TableCell
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <DragHandleIcon
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <NumberInput helperText="Unique id" label="Question ID" source={`questions[${index}].id`} />
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <TextInput helperText="i.e. How do you do?" label="Question Text" source={`questions[${index}].text`} />
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Button style={{ color: 'red' }} type="button" onClick={() => fieldProps.fields.remove(index)}>
                                                                        Remove
                                                                </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </Table>
                            <Button
                                type="button"
                                onClick={() => fieldProps.fields.push({ id: '', question: '' })}
                                color="secondary"
                                variant="contained"
                                style={{ marginTop: '16px' }}
                            >
                                <Add />
                            </Button>
                        </TableContainer>
                    </DragDropContext>
                )
            }}
        </FieldArray>
    )
}

export const HobbiesCustomIterator = ({ record }) => {
    const notify = useNotify();
    const [mutate, { loading }] = useMutation({}, {
        // https://marmelab.com/react-admin/Actions.html#optimistic-rendering-and-undo
        mutationMode: 'undoable',
        onSuccess: () => {
            notify('Hobbies reordered', 'info', {}, true);
        },
        onFailure: (error) => notify(`Error: ${error.message}`, 'warning'),
    });

    const reorder = (newHobbies) => mutate({
        type: 'update',
        resource: 'users',
        payload: {
            id: record.id,
            data: { hobbies: newHobbies }
        }
    });

    const onDragEnd = (result, provided) => {
        const {
            source,
            destination
        } = result;

        // Get the item
        const item = record.hobbies[source.index];

        // Remove item from array
        const newArray = record.hobbies.filter((el, index) => index !== source.index);

        // Insert item at destination
        newArray.splice(destination.index, 0, item)

        // Call mutation function
        reorder(newArray)
    }

    return (
        <FieldArray name="hobbies">
            {(fieldProps) => {
                return (
                    <DragDropContext
                        onDragEnd={onDragEnd} // modified
                    >
                        <TableContainer>
                            <Table
                                aria-label="hobbies list"
                            >
                                <Droppable droppableId="droppable-hobbies" type="HOBBIES">
                                    {(provided, snapshot) => (
                                        <TableBody
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {fieldProps.fields.map((hobby, index) => {
                                                return (
                                                    <Draggable key={String(fieldProps.fields.value[index].id)} draggableId={String(fieldProps.fields.value[index].id)} index={index}>
                                                        {(provided, snapshot) => (
                                                            <TableRow
                                                                hover
                                                                tabIndex={-1}
                                                                key={index}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                            >
                                                                <TableCell
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <DragHandleIcon
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <NumberInput helperText="Unique id" label="Hobby ID" source={`hobbies[${index}].id`} />
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <TextInput helperText="i.e. How do you do?" label="Hobby Text" source={`hobbies[${index}].hobby`} />
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Button style={{ color: 'red' }} type="button" onClick={() => fieldProps.fields.remove(index)}>
                                                                        Remove
                                                                </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </Table>
                            <Button
                                type="button"
                                onClick={() => fieldProps.fields.push({ id: '', question: '' })}
                                color="secondary"
                                variant="contained"
                                style={{ marginTop: '16px' }}
                            >
                                <Add />
                            </Button>
                        </TableContainer>
                    </DragDropContext>
                )
            }}
        </FieldArray>
    )
}