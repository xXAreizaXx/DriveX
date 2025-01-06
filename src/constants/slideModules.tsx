// UI - Transfers
import CreateFormTranfer from "@ui/transfers/CreateFormTranfer";
import DeleteFormTranfer from "@ui/transfers/DeleteFormTranfer";
import UpdateFormTranfer from "@ui/transfers/UpdateFormTranfer";

export const slideModules: Record<TModule, React.ReactNode> = {
    "transfers-create": <CreateFormTranfer />,
    "transfers-update": <UpdateFormTranfer />,
    "transfers-delete": <DeleteFormTranfer />,
};