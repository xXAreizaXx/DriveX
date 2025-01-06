// ReactJS
import { useTranslation } from "react-i18next";

// MUI
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function EnhancedTableHead({ tableHeader }: EnhancedTableHeadProps) {
    // Translations
    const { t } = useTranslation();

    return (
        <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
                {tableHeader.map((headCell, index) => (
                    <TableCell key={index} align="center">
                        {t(headCell)}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function TableLayout({ children, tableHeader }: TableLayoutProps) {
    // Functions
    const findComponentByType = (type: "filter" | "content" | "pagination") => {
        if (!Array.isArray(children)) return null;

        return children.find((child) => {
            if (!child || typeof child !== "object") return false;

            const componentKey = (child as React.ReactElement)?.key;

            switch (type) {
            case "filter":
                return componentKey?.includes("Filter");
            case "content":
                return Array.isArray(child) || componentKey?.includes("Row");
            case "pagination":
                return componentKey?.includes("Pagination");
            default:
                return false;
            }
        });
    };

    // Constants
    const filterComponent = findComponentByType("filter");
    const tableContent = findComponentByType("content");
    const paginationComponent = findComponentByType("pagination");

    return (
        <Paper sx={{
            backgroundColor: "transparent",
            borderRadius: "8px",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%"
        }}>
            {filterComponent}
            <TableContainer sx={{ backgroundColor: "background.paper", border: "1px solid #E0E0E0", borderRadius: "8px" }}>
                <Table aria-labelledby="tableTitle">
                    <EnhancedTableHead tableHeader={tableHeader} />
                    <TableBody>{tableContent}</TableBody>
                </Table>
            </TableContainer>
            {paginationComponent}
        </Paper>
    );
}