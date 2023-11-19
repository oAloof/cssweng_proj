const Button = ({ text, onClick, category }) => {
  if (category === "default" || category === undefined) {
    return (
      <button
        className={`
                          relative z-0 flex items-center  justify-center gap-2 overflow-hidden rounded-lg border-[1px] px-4 py-2 font-semibold
                          uppercase bg-indigo-500 text-indigo-100 transition-all duration-500 w-full
                          
                          before:absolute before:inset-0
                          before:-z-10 before:translate-x-[150%]
                          before:translate-y-[150%] before:scale-[2.5]
                          before:rounded-[100%] before:bg-indigo-300 hover:text-white
                          before:transition-transform before:duration-1000
                          before:content-[""]
                  
                          hover:scale-105 
                          hover:before:translate-x-[0%]
                          hover:before:translate-y-[0%]
                          active:scale-95`}
        onClick={onClick}
      >
        <span>{text}</span>
      </button>
    );
  } else if (category === "register") {
    return (
      <button
        className={`
                          relative z-0 flex items-center  justify-center gap-2 overflow-hidden rounded-lg  px-4 py-2 font-semibold
                          uppercase bg-violet-100/50 text-violet-600 transition-all duration-500 w-full
                          
                          before:absolute before:inset-0
                          before:-z-10 before:translate-x-[150%]
                          before:translate-y-[150%] before:scale-[2.5]
                          before:rounded-[100%] before:bg-violet-500 hover:text-white
                          before:transition-transform before:duration-1000
                          before:content-[""]
                  
                          hover:scale-105 
                          hover:before:translate-x-[0%]
                          hover:before:translate-y-[0%]
                          active:scale-95`}
        onClick={onClick}
      >
        <span>SIGN UP</span>
      </button>
    );
  }
};

export default Button;
