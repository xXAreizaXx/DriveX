type TTransfer = {
    client: string;
    created_at: string;
    id: number;
    plate: string;
    service: number;
    transmitter: string;
    type: string;
};

type DtoTransfer = {
    client: string;
    created_at: string;
    plate: string;
    service: number;
    transmitter: string;
    type: string;
};

type TFilterTransfer = {
    plate: string;
    transferType: string
};

interface IFilterTransfersProps {
    setFilter: React.Dispatch<React.SetStateAction<TFilterTransfer | null>>
}