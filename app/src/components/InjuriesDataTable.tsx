import * as React from "react";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import InjuryDialog from "./InjuryDialog";
import {
    injuriesDataTableToolbarStyles,
    injuriesDataTableStyles
} from "../styles/react/InjuriesDataTableStyles";
import { Injury, AthleteInjuries, Team, User, Athlete, Order } from "../util/types";
import { headCells } from "../constants/constants";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";

interface InjuriesDataTableProps {
    injuries: Injury[];
    injuryOpen: boolean;
    handleInjuryOpen: any;
    handleInjuryClose: any;
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    selectedTeam: Team;
    currentUser: User;
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}

interface EnhancedTableProps {
    classes: ReturnType<typeof injuriesDataTableStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Injury) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    onExport: () => void;
    currentUser: User;
}

/**
 * Injury data table to display injuries within a query or for an athlete.
 * @param props
 */
export default function InjuriesDataTable(props: InjuriesDataTableProps) {
    const classes = injuriesDataTableStyles({});
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Injury>("athleteName");
    const [selectedInjuries, setSelectedInjuries] = React.useState<string[]>([]);
    const [selectedInjury, setSelectedInjury] = React.useState<Injury | null>(null);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    /**
     * Sort the table data by a certain property.
     * @param _
     * @param property
     */
    const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Injury) => {
        const isDesc = orderBy === property && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(property);
    };

    /**
     * Select all rows.
     * @param event
     */
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = props.injuries.map(n => n.id);
            setSelectedInjuries(newSelecteds);
            return;
        }
        setSelectedInjuries([]);
    };

    /**
     * Handle checkbox selection of a single row.
     * @param event
     * @param name
     */
    const handleSelection = (event: React.MouseEvent<unknown>, name: string) => {
        event.stopPropagation();
        const selectedIndex = selectedInjuries.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedInjuries, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedInjuries.slice(1));
        } else if (selectedIndex === selectedInjuries.length - 1) {
            newSelected = newSelected.concat(selectedInjuries.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedInjuries.slice(0, selectedIndex),
                selectedInjuries.slice(selectedIndex + 1)
            );
        }

        setSelectedInjuries(newSelected);
    };

    /**
     * Trigger the injury dialog to open upon clicking on an injury row.
     * @param _
     * @param name
     */
    const handleRowClick = (_: React.MouseEvent<unknown>, name: string) => {
        let selectedInjury = props.injuries.filter(i => i.id == name)[0];
        if (!!selectedInjury) {
            setSelectedInjury(selectedInjury);
            props.handleInjuryOpen();
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selectedInjuries.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, props.injuries.length - page * rowsPerPage);

    /**
     * Export the selected athletes to a csv containing the injury information.
     */
    const onExport = () => {
        let headers =
            "Active,Created On,Created By,Team Name,Athlete Name,Injury Date," +
            "Is Sports Related,Event Type,Side Of Body,Location On Body," +
            "Injury Type,Severity,Status,Mechanism,Injury Description,Other Notes,\r\n";
        let csvContent = "data:text/csv;charset=utf-8," + headers;
        props.injuries
            .filter(i => selectedInjuries.indexOf(i.id) !== -1)
            .map(i => {
                let values = [
                    i.active.toString(),
                    i.createdOn.toDateString(),
                    i.createdBy.toString(),
                    i.teamName.toString(),
                    i.athleteName.toString(),
                    i.injuryDate.toDateString(),
                    i.isSportsRelated.toString(),
                    i.eventType.toString(),
                    i.sideOfBody.toString(),
                    i.locationOnBody.toString(),
                    i.injuryType.toString(),
                    i.severity.toString(),
                    i.status.toString(),
                    i.mechanism.toString(),
                    `"` + i.injuryDescription.replace(/"/g, `'`).toString() + `"`,
                    `"` + JSON.stringify(i.otherNotes).replace(/"/g, `'`) + `"`
                ];
                csvContent += values + "\r\n";
            });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    };

    const getStatusColor = (status: string) => {
        if (status == "Out") return "#b50d0d";
        if (status == "Mod") return "#f0da37";
        else return "#2cb030";
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selectedInjuries.length}
                    onExport={onExport}
                    currentUser={props.currentUser}
                />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selectedInjuries.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.injuries.length}
                        />
                        <TableBody>
                            {stableSort(props.injuries, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: Injury, index: number) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            onClick={event => handleRowClick(event, row.id)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onClick={event =>
                                                        handleSelection(event, row.id)
                                                    }
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.athleteName}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.injuryDate.toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.locationOnBody}
                                            </TableCell>
                                            <TableCell align="right">{row.injuryType}</TableCell>
                                            <TableCell align="right">{row.severity}</TableCell>
                                            <TableCell align="right" style={{ display: "flex" }}>
                                                {row.status}{" "}
                                                <div
                                                    className={classes.statusIndicator}
                                                    style={{
                                                        backgroundColor: getStatusColor(row.status)
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.injuries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "previous page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "next page"
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            {!!selectedInjury && props.currentUser.permissions.canSeeInjuryDetails && (
                <InjuryDialog
                    injury={selectedInjury}
                    injuryOpen={props.injuryOpen}
                    handleInjuryClose={props.handleInjuryClose}
                    getAthleteInjuries={props.getAthleteInjuries}
                    startingDate={props.startingDate}
                    endingDate={props.endingDate}
                    selectedTeam={props.selectedTeam}
                    currentUser={props.currentUser}
                    getCurrentRoster={props.getCurrentRoster}
                ></InjuryDialog>
            )}
        </div>
    );
}

/**
 * Enhanced Table Head displays the header of the data table.
 * @param props
 */
function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } = props;
    const createSortHandler = (property: keyof Injury) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

/**
 * Enhanced Table Toolbar displays information about selection count and handles exporting.
 * @param props
 */
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = injuriesDataTableToolbarStyles({});
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <>
                    <Button className={classes.export} color="inherit" onClick={props.onExport}>
                        <GetAppIcon style={{ paddingRight: "4px" }} />
                        <Typography variant="subtitle1">Export {numSelected} selected</Typography>
                    </Button>
                </>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    Injury Information
                </Typography>
            )}
        </Toolbar>
    );
};

function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting<K extends keyof any>(
    order: Order,
    orderBy: keyof Injury
): (a: Injury, b: Injury) => number {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
