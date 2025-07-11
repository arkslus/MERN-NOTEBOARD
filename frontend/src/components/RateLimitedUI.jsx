import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-[#fb8500] border border-orange/30 rounded-lg shadow-md text-[#023047]">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-[#8ecae6] p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Rate Limit Reached</h3>
            <p className="text-[#023047] mb-1">
              You have exceeded the rate limit for this API endpoint. Please try
              again later.
            </p>
            <p className="text-sm text-[#023047]">
              If this error persists, wait a few minutes and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
