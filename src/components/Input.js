import { Controller } from "react-hook-form";

const Input = ({ type, placeholder, control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full mt-1 mb-2">
          <input
            type={type}
            placeholder={placeholder}
            className={`w-full border rounded-md px-3 py-1 ${
              error && "border-red-600 mb-0"
            }`}
            {...field}
          />
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};

export default Input;
