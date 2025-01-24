import { usePage } from '@inertiajs/inertia-react';

function VerificationSent() {
    const { message, error } = usePage().props;

    return (
        <div>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default VerificationSent;
