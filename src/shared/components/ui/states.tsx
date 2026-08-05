type StateProps = {
  message?: string;
};

export const EmptyState = ({ message = "No items found" }: StateProps) => (
  <div className="flex justify-center items-center py-16 text-gray-500 text-sm">
    {message}
  </div>
);

export const ErrorState = ({ message = "Server error" }: StateProps) => (
  <div className="flex justify-center items-center py-16 text-red-500 text-sm">
    {message}
  </div>
);