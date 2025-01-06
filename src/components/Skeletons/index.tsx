import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface TableSkeletonProps {
    rowsNum?: number;
    columnsNum?: number;
}

export function TableSkeleton({ rowsNum = 5, columnsNum = 4 }: TableSkeletonProps) {
    return (
        <Paper sx={{
            backgroundColor: "transparent",
            borderRadius: "8px",
            boxShadow: "none",
            width: "100%"
        }}>
            {/* Filter Skeleton */}
            <Skeleton
                variant="rectangular"
                sx={{
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    height: 60,
                    mb: 2
                }}
            />

            {/* Table Skeleton */}
            <TableContainer sx={{
                backgroundColor: "background.paper",
                border: "1px solid #E0E0E0",
                borderRadius: "8px"
            }}>
                <Table aria-labelledby="tableTitle">
                    <TableHead sx={{ backgroundColor: "primary.main" }}>
                        <TableRow>
                            {[...Array(columnsNum)].map((_, index) => (
                                <TableCell key={index} align="center">
                                    <Skeleton variant="text" sx={{ bgcolor: "grey.300" }} />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(rowsNum)].map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {[...Array(columnsNum)].map((_, colIndex) => (
                                    <TableCell key={colIndex} align="center">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Skeleton */}
            <Skeleton
                variant="rectangular"
                sx={{
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    height: 52,
                    mt: 2
                }}
            />
        </Paper>
    );
}