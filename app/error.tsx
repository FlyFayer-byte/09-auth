"use client";

interface ErrorHandlerProps {
    error: Error;
    reset: () => void;
}

function ErrorHandler({ error, reset }: ErrorHandlerProps) {
    return (
        <div>
            <h3>Opss. Something went wrong</h3>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Try Again</button>
        </div>
    );
}
export default ErrorHandler;