import * as React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert, {AlertColor} from "@mui/material/Alert";

type ToastProp = {
    message: string;
    type?: AlertColor;
    duration?: number;
};

type ToastContextType = {
    toast: (props: ToastProp) => void;
    toastError: (error: any) => void;
};

const ToastContext = React.createContext<ToastContextType>({
    toast: () => undefined,
    toastError: () => undefined,
});

export const useToast = () => {
    return React.useContext(ToastContext);
};


export const ToastContextProvider = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('success');
    const [duration, setDuration] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    const toast = ({ message, type = 'success', duration = 5000 }) => {
        setMessage(message);
        setType(type);
        setDuration(duration);
        setOpen(true);
    };
    const toastError = (error) => {
        if(error.response) {
            let data = error.response.data;
            setMessage(Object.entries(data).reduce((str, [p, val]) => {
                return `${str}${p}: ${val}\n`;
            }, '').toString());
        } else {
            setMessage(error.toString());
        }

        setType('error');
        setDuration(5000);
        setOpen(true);
    };

    const contextValue = { toast,toastError };

    // @ts-ignore
    return (
        <ToastContext.Provider value={contextValue}>
            <>
                {children}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={duration}
                    onClose={handleClose}
                >
                    <Alert severity={type} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </>
        </ToastContext.Provider>
    );
};

export default ToastContext;