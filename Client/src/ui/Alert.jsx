import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';

const MySwal = withReactContent(Swal);

const showAlert = ({
    title,
    text = '',
    icon = 'success',
    confirmButtonText = 'OK',
    showCancelButton = false,
    cancelButtonText = 'Cancel',
    customClass = {},
    onConfirm,
    onCancel,
}) => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';

    const primaryButtonClass = theme === 'dark'
        ? 'text-slate-800 bg-white hover:bg-gray-200 border-none rounded-md font-medium shadow-none py-2 px-6 min-w-[100px] cursor-pointer'
        : 'text-white bg-slate-800 hover:bg-slate-700 border-none rounded-md font-medium shadow-none py-2 px-6 min-w-[100px] cursor-pointer';

    const outlineButtonClass = theme === 'dark'
        ? 'text-neutral-content bg-transparent hover:bg-base-300 border border-neutral-content/30 rounded-md font-medium shadow-none py-2 px-6 min-w-[100px] cursor-pointer'
        : 'text-slate-800 bg-transparent hover:bg-slate-100 border border-slate-300 rounded-md font-medium shadow-none py-2 px-6 min-w-[100px] cursor-pointer';

    return MySwal.fire({
        title: <span className="text-xl font-semibold">{title}</span>,
        html: <div className="mb-6">{text}</div>,
        icon,
        showConfirmButton: true,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        background: theme === 'dark' ? '#23272e' : '#fff',
        color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
        customClass: {
            popup: 'rounded-lg shadow-xl',
            confirmButton: primaryButtonClass,
            cancelButton: outlineButtonClass,
            actions: 'gap-3',
            ...customClass,
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm(result);
        } else if (
            result.isDismissed &&
            onCancel &&
            (result.dismiss === Swal.DismissReason.cancel ||
                result.dismiss === Swal.DismissReason.backdrop ||
                result.dismiss === Swal.DismissReason.esc)
        ) {
            onCancel(result);
        }
        return result;
    });
};

export default showAlert;