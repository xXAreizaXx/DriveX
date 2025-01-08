type TMetrics =  {
    overview: {
        total_transfers: number;
        total_revenue: number;
        average_service_cost: number;
    };
    transfers_by_type: {
        Venta: number;
        Cesión: number;
    },
    recent_activity: {
        last_24h: number;
        last_week: number;
    };
    performance_metrics: {
        daily_average_transfers: number;
        most_common_type: string;
    };
};