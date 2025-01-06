interface ISlideAction {
    module: TModule;
    open: boolean;
    params: IParams;
    setModule: React.Dispatch<React.SetStateAction<TModule>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setParams: React.Dispatch<React.SetStateAction<IParams>>;
    slideComponent: React.ReactNode | null;
}

type IParams = {
    id?: number | string;
    extra?: number | string;
    title?: string;
    description?: string;
};

type TModule = "transfers-create" | "transfers-update" | "transfers-delete";