import React from 'react';

const Button = ({ handleSubmit, loading = false }: { handleSubmit: () => void, loading?: boolean }) => {
  return (
    <div className="my-6 text-center">
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? 'Loading...' : 'Submit Command'}
      </button>
    </div>
  );
};

export default Button;
