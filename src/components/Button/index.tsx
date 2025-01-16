import React from 'react';

const Button = ({ handleSubmit, loading = false,buttonName,className }: { handleSubmit?: () => void, loading?: boolean, buttonName? :string,className?: string}) => {
  return (
    <div className="my-6 text-center">
      <button
        disabled={loading}
        onClick={handleSubmit}
        className={className ? className : "w-full px-4 py-2 bg-blue-700 text-white text-nowrap rounded-md hover:bg-blue-700" }
      >
        {loading ? 'Loading...' : buttonName ? buttonName :'Submit Command'}
      </button>
    </div>
  );
};

export default Button;
