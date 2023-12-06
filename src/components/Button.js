const Button = ({ type, bgColor, title, onClick, width, alignItems }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor} ${width} ${alignItems} mt-1 mb-2 h-[33.6px] text-white px-3 rounded-md`}
    >
      {title}
    </button>
  );
};

export default Button;
