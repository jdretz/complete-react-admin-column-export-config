import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ArrayInput,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  FormTab,
  Toolbar,
  SaveButton,
  // new imports
  downloadCSV,
  CreateButton,
  TopToolbar,
} from "react-admin";
import jsonExport from "jsonexport/dist";
import { HobbiesCustomIterator } from "./CustomIterators";
import { VerticalTabbedForm } from "./VerticalTabbedForm";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HomeIcon from "@material-ui/icons/Home";
import RowingIcon from "@material-ui/icons/Rowing";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// new imports
import Button from "@material-ui/core/Button";
import GetApp from "@material-ui/icons/GetApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import MuiTextField from "@material-ui/core/TextField";
import { omit } from "lodash";

const MuiFormGroup = withStyles({
  root: {
    flexDirection: "row",
  },
})(FormGroup);

const MuiTabs = withStyles({
  root: {
    borderRight: "1px solid #CCC",
  },
})(Tabs);

const TabLabel = ({ text }) => (
  <Typography
    style={{
      width: "125px",
    }}
  >
    {text}
  </Typography>
);

const CustomTabs = (props) => {
  return (
    <MuiTabs
      orientation="vertical"
      variant="scrollable"
      value={props.value}
      aria-label="Vertical tabs example"
      onChange={props.onChange}
    >
      <Tab
        label={<TabLabel text="General Information" />}
        icon={<AccountBoxIcon />}
      />
      <Tab label={<TabLabel text="Address" />} icon={<HomeIcon />} />
      <Tab
        label={<TabLabel text="What Are Your Hobbies?" />}
        icon={<RowingIcon />}
      />
      <Tab label={<TabLabel text="Extra 1" />} icon={<AddIcon />} />
      <Tab label={<TabLabel text="Extra 2" />} icon={<AddIcon />} />
      <Tab label={<TabLabel text="Extra 3" />} icon={<AddIcon />} />
      <Tab label={<TabLabel text="Extra 4" />} icon={<AddIcon />} />
      <Tab label={<TabLabel text="Extra 5" />} icon={<AddIcon />} />
    </MuiTabs>
  );
};

const UsersCreateToolbar = (props) => {
  return (
    <Toolbar style={{ marginTop: 0 }} {...props}>
      <SaveButton />
    </Toolbar>
  );
};

const UsersTitle = ({ record }) => {
  return <span>Users {record ? `"${record.name}"` : ""}</span>;
};

/**
 * 
 * @param {array} users List of entity objects
 * @param {array} exportColumns List of strings for column names user wants to include
 * @param {array} allColumnsArray List of all column names for object
 * @param {*} documentTitle Name of export file
 */
 const customExporter = (
    users,
    exportColumns,
    allColumnsArray,
    documentTitle
  ) => {
    /**
     * Create a list of the columns the user DID NOT want to include
     */
    const omittedColumns = allColumnsArray.filter(
      (col) => !exportColumns.includes(col)
    );
  
    /**
     * Map over the user array and omit the excluded properties 
     */
    const usersForExport = users.map((user) => {
      const newUserExport = omit(user, omittedColumns);
      return newUserExport;
    });
  
    /**
     * Use React Admins exporting functions but pass in custom data
     */
    jsonExport(usersForExport, (err, csv) => {
      downloadCSV(csv, documentTitle); 
    });
  };

const ListActions = ({ data: users, resource }) => {
  const usersArray = Object.values(users); // Create list of user objects
  const [open, setOpen] = React.useState(false); // Controls export config modal
  const [exportColumns, setExportColumns] = React.useState(""); // User selected columns
  const [allColumnsArray, setAllColumnsArray] = React.useState(""); // All columns reference
  const [documentTitle, setDocumentTitle] = React.useState(resource); // Custom file name

  const handleClickOpen = () => {
    const columnNames = Object.keys(usersArray[0]); // Extract user object properties

    /**
     * Create an object with column names as properties
     * Set all property values (for column names) to true
     *
     * {
     *   id: true,
     *   name: true,
     *   occupation: true
     * }
     */
    const checkedColumnsNamesObject = columnNames.reduce(
      (o, key) => ({ ...o, [key]: true }),
      {}
    );
    setExportColumns(checkedColumnsNamesObject);
    setAllColumnsArray(columnNames);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setExportColumns({
      ...exportColumns,
      [event.target.name]: event.target.checked,
    });
  };

  const handleExport = () => {
    /**
     * Convert the checkbox state object back into an array of strings
     * i.e., ['id', 'name']
     */
    const exportColumnsArray = allColumnsArray.filter(
      (col) => exportColumns[col]
    );

    /**
     * After user is done figuring, call the custom export function
     */
    customExporter(
      usersArray,
      exportColumnsArray,
      allColumnsArray,
      documentTitle
    );
    setOpen(false);
  };

  return (
    <TopToolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="export-config"
        aria-describedby="export-config-description"
      >
        <DialogTitle id="export-config">
          {"Choose the Columns You Wish To Export"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="export-config-description">
            You may choose columns to export by selecting the checkbox next to
            the column name. Also, you have the option to name the export.
          </DialogContentText>
          {exportColumns && (
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <b>Export Configuration</b>
              </FormLabel>
              <MuiTextField
                label="Document Title"
                id="documentTitle"
                value={documentTitle}
                style={{ paddingBottom: "16px" }}
                onChange={(e) => setDocumentTitle(e.target.value)}
                helperText="Do not append format on to the end. (i.e., '.csv')"
              />
              <MuiFormGroup>
                {Object.keys(exportColumns).map((col) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={exportColumns[col]}
                          onChange={handleCheckboxChange}
                          name={col}
                        />
                      }
                      label={col}
                    />
                  );
                })}
              </MuiFormGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleExport} color="primary" autoFocus>
            Export
          </Button>
        </DialogActions>
      </Dialog>
      <CreateButton />
      <Button
        variant="text"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        <GetApp style={{ paddingRight: "3px" }} fontSize="small" /> Export
      </Button>
    </TopToolbar>
  );
};

export const UsersList = (props) => (
  <List {...props} actions={<ListActions {...props} />} exporter={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="occupation" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UsersEdit = (props) => (
  <Edit title={<UsersTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="occupation" />
      <TextInput source="address.streetAddress" />
      <TextInput source="address.apt" />
      <TextInput source="address.city" />
      <TextInput source="address.state" />
      <TextInput source="address.zipcode" />
      <ArrayInput source="hobbies">
        <HobbiesCustomIterator />
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export const UsersCreate = (props) => (
  <Create {...props}>
    <VerticalTabbedForm
      tabs={<CustomTabs {...props} />}
      toolbar={<UsersCreateToolbar {...props} />}
    >
      <FormTab label="General Information">
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="occupation" />
      </FormTab>
      <FormTab label="Address">
        <TextInput source="address.streetAddress" />
        <TextInput source="address.apt" />
        <TextInput source="address.city" />
        <TextInput source="address.state" />
        <TextInput source="address.zipcode" />
      </FormTab>
      <FormTab label="What Are Your Hobbies?">
        <ArrayInput source="hobbies">
          <HobbiesCustomIterator />
        </ArrayInput>
      </FormTab>
    </VerticalTabbedForm>
  </Create>
);
