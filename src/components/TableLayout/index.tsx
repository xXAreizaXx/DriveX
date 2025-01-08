// ReactJS
import { useTranslation } from "react-i18next";

// Contexts
import { useAuth } from "@contexts/AuthContext";
import { useSlideAction } from "@contexts/SlideActionContext";

// Components
import { BtnPrimary } from "@components/Buttons";

// MUI
import { AddCircleOutline } from "@mui/icons-material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// Constants
import { PERMISSIONS } from "@constants/roles";

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

export default function TableLayout({ children, module, tableHeader }: TableLayoutProps) {
    // Contexts
    const { setOpen, setModule, setParams } = useSlideAction();
    const { user } = useAuth();

    // Translations
    const { t } = useTranslation();

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

    const handleCreate = () => {
        const moduleCapitalized = module.charAt(0).toUpperCase() + module.slice(1);

        setOpen(true);
        setModule(`${module}-create`);
        setParams({
            title: `${moduleCapitalized}.Create.Title`,
            description: `${moduleCapitalized}.Create.Description`
        });
    };

    const canCreate = () => {
        switch(module) {
        case "transfers":
            return user?.permissions?.includes(PERMISSIONS.WRITE_TRANSFERS);
        default:
            return false;
        }
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
            <BtnPrimary sx={{ gap: 1, width: "fit-content", alignSelf: "flex-end" }} onClick={handleCreate} isDisabled={!canCreate()}>
                <AddCircleOutline />
                {t("Constants.Btn.Add")}
            </BtnPrimary>
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