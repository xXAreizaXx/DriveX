// ReactJS
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { TablePagination } from "@mui/material";

export default function Pagination(props: IPaginationProps) {
    // Props
    const { data, page, rowsPerPage, setPage, setRowsPerPage } = props;

    // Translations
    const { t } = useTranslation();

    // Functions
    const handleChangePage = (e: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };
    return (
        <TablePagination
            component="footer"
            count={data?.length ?? 0}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t("Constants.Of")} ${count}`}
            labelRowsPerPage={t("Constants.RowsPerPage")}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10]}
        />
    );
}