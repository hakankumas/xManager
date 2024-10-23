import { useSnackbar } from "notistack";
import { SnackBarProps } from "../types/SnackBarTypes";

function useCustomSnackBar() {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackBar = ({ message, variant }: SnackBarProps) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
            autoHideDuration: 1500,
        });
    };

    return { showSnackBar };
}

export default useCustomSnackBar;
