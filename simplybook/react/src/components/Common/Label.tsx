import clsx from "clsx";

type LabelProps = {
    className?: string;
    children: React.ReactNode;
    labelVariant?: string;
};

export const Label = ({ 
    className, 
    children, 
    labelVariant
 }: LabelProps) => {

    // Base styles
    const baseStyles = "py-1 px-2 min-w-20 text-center text-sm rounded-md font-semibold";
    const labelStyles = {
        "border-2 border-blac text-xs " : labelVariant === 'ghost',
        "bg-succes-light text-succes" : labelVariant === 'trial',
        "bg-yellow-100 text-yellow-900" : labelVariant === 'warning',
        "bg-red-100 text-red-600" : labelVariant === 'trial-expired',
        "bg-yellow-900 text-black" : labelVariant === 'task-open',
        "bg-red-600 text-white" : labelVariant === 'task-urgent',
        "bg-slate-600 text-white" : labelVariant === 'task-premium',
        "bg-succes text-white" : labelVariant === 'task-completed',
    }

    // Combine base styles with props.className
    const combinedStyles = clsx(baseStyles, labelStyles, className);

    return (
        <span className={clsx(combinedStyles, className)} >
            {children}
        </span>
    );
};

export default Label;