"use client";

// ReactJS
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// HOC
import { withAuth } from "@HOC/withAuth";

// MUI
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Components
import Loader from "@components/Loader";

// Services
import { getMetrics } from "@services/metrics";

// Constants
import { UserRole } from "@constants/roles";

// Reusable card component
const MetricCard = ({ title, value }: { title: string; value: string | number }) => (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
        <Card>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h5">{value}</Typography>
            </CardContent>
        </Card>
    </Grid2>
);

function HomePage() {
    // Translations
    const { t } = useTranslation();

    // Queries
    const { data: metrics, isLoading } = useQuery<TMetrics>({
        queryKey: ["metrics"],
        queryFn: () => getMetrics()
            .then((res) => {
                return res?.data;
            })
            .catch(() => null)
    });

    if (isLoading) return <Loader />;

    return (
        <Grid2 container spacing={3} padding={2}>
            <MetricCard
                title={t("Dashboard.Overview.TotalTransfers")}
                value={metrics?.overview?.total_transfers as number}
            />
            <MetricCard
                title={t("Dashboard.Overview.TotalRevenue")}
                value={`$${metrics?.overview?.total_revenue}`}
            />
            <MetricCard
                title={t("Dashboard.Overview.AverageServiceCost")}
                value={`$${metrics?.overview?.average_service_cost}`}
            />

            <Grid2 size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {t("Dashboard.TransfersByType.Title")}
                        </Typography>
                        <Box height={300}>
                            <BarChart
                                xAxis={[{ scaleType: "band", data: metrics?.transfers_by_type ? Object.keys(metrics.transfers_by_type) : [] }]}
                                series={[{
                                    data: metrics?.transfers_by_type ? Object?.values(metrics.transfers_by_type) : [],
                                    label: t("Dashboard.TransfersByType.Title"),
                                }]}
                                width={500}
                                height={300}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{t("Dashboard.RecentActivity.Title")}</Typography>
                        <Typography>
                            {t("Dashboard.RecentActivity.Last24h")}: {metrics?.recent_activity.last_24h}
                        </Typography>
                        <Typography>
                            {t("Dashboard.RecentActivity.LastWeek")}: {metrics?.recent_activity.last_week}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">{t("Dashboard.PerformanceMetrics.Title")}</Typography>
                        <Typography>
                            {t("Dashboard.PerformanceMetrics.DailyAverageTransfers")}:{" "}
                            {metrics?.performance_metrics?.daily_average_transfers}
                        </Typography>
                        <Typography>
                            {t("Dashboard.PerformanceMetrics.MostCommonType")}:{" "}
                            {metrics?.performance_metrics?.most_common_type}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}

export default withAuth(HomePage, {
    requiredRoles: [UserRole.ADMIN, UserRole.USER, UserRole.GUEST],
});

