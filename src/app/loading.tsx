'use client'

const loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400"></div>
        </div>
    );
};

export default loading;