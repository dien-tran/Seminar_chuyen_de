import React from 'react';

export type ApiUnavailableBannerProps = {
  show: boolean;
};

const ApiUnavailableBanner: React.FC<ApiUnavailableBannerProps> = ({ show }) => {
  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 z-50">
      Backend API is unavailable. Please try again later.
    </div>
  );
};

export default ApiUnavailableBanner;
