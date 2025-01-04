interface IButtonProps {
    children: React.ReactNode;
    isDisabled?: boolean;
    isLoading?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    options?: {
        icon: React.ReactNode;
        label: string;
        onClick: () => void;
    }[];
    type?: "button" | "submit" | "reset";
}
